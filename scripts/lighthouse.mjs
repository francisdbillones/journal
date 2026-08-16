import { createServer } from 'node:http';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { brotliCompress } from 'node:zlib';
import { promisify } from 'node:util';
import { extname, resolve, sep } from 'node:path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const compress = promisify(brotliCompress);
const root = resolve('_site');
const host = '127.0.0.1';
const port = 4173;
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8'
};

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, `http://${host}`).pathname);
    let filename = resolve(root, `.${pathname}`);

    if (filename !== root && !filename.startsWith(`${root}${sep}`)) {
      response.writeHead(403).end();
      return;
    }

    const fileStats = await stat(filename);
    if (fileStats.isDirectory()) filename = resolve(filename, 'index.html');

    const body = await readFile(filename);
    const contentType = mimeTypes[extname(filename)] || 'application/octet-stream';
    const headers = {
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Content-Type': contentType,
      'Vary': 'Accept-Encoding'
    };

    if (request.headers['accept-encoding']?.includes('br') && /^(text|application\/(javascript|json|xml))/.test(contentType)) {
      headers['Content-Encoding'] = 'br';
      response.writeHead(200, headers).end(await compress(body));
    } else {
      response.writeHead(200, headers).end(body);
    }
  } catch (error) {
    const status = error.code === 'ENOENT' ? 404 : 500;
    response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' }).end(status === 404 ? 'Not found' : 'Server error');
  }
});

let chrome;

try {
  await new Promise((resolveReady, reject) => {
    server.once('error', reject);
    server.listen(port, host, resolveReady);
  });

  chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
  const result = await lighthouse(`http://${host}:${port}`, {
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port
  });

  await writeFile('.lighthouse-report.json', result.report);

  const scores = Object.fromEntries(
    Object.entries(result.lhr.categories).map(([id, category]) => [id, Math.round(category.score * 100)])
  );
  const insightFailures = Object.values(result.lhr.audits).filter((audit) =>
    audit.id.endsWith('-insight') &&
    audit.score !== null &&
    audit.score < 1 &&
    !['informative', 'manual', 'notApplicable'].includes(audit.scoreDisplayMode)
  );

  console.log(JSON.stringify({
    scores,
    insightFailures: insightFailures.map(({ id, title, score, displayValue }) => ({ id, title, score, displayValue }))
  }, null, 2));

  if (Object.values(scores).some((score) => score !== 100) || insightFailures.length > 0) process.exitCode = 1;
} finally {
  await chrome?.kill();
  await new Promise((resolveClosed) => server.close(resolveClosed));
}
