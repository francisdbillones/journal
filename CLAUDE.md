# CLAUDE.md

This file describes the codebase for AI coding assistants.

## Project Overview

This is a personal blog/journal site for Francis Billones, hosted at [journal.francisdb.net](https://journal.francisdb.net). It is a static site built with **Jekyll 4.3** and themed with a customised version of the [Lanyon](http://lanyon.getpoole.com) / [Poole](https://github.com/poole/poole) theme.

Posts cover topics like technology, math, finance, society, and philosophy.

## Tech Stack

| Layer | Technology |
|---|---|
| Static site generator | Jekyll ~> 4.3 |
| Language (plugins) | Ruby |
| Templating | Liquid |
| Styling | SCSS (inline via `scssify` filter) |
| Fonts | Google Fonts – Lora |
| Math rendering | MathJax 3.2.2 |
| Feed | Atom (`atom.xml`) |
| Analytics | Google Analytics (GA4) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions (`.github/workflows/jekyll.yml`) |

## Directory Structure

```
journal/
├── _config.yml               # Jekyll site configuration
├── Gemfile                   # Ruby gem dependencies
├── index.html                # Home page (post listing)
├── about.md                  # About page (layout: page)
├── 404.md                    # Custom 404 page
├── atom.xml                  # Atom RSS feed
├── CNAME                     # Custom domain for GitHub Pages
│
├── _posts/                   # Blog posts (Markdown)
│   └── YYYY-MM-DD-slug.md
│
├── drafts/                   # Unpublished draft posts
│
├── _layouts/
│   ├── compress.html         # HTML compression wrapper (outermost layout)
│   ├── default.html          # Base layout: masthead + content container
│   ├── page.html             # Layout for static pages
│   ├── post.html             # Layout for blog posts (title, date, tags, footer)
│   ├── tag.html              # Layout for tag index pages
│   └── stylesheet.css        # (unused/legacy)
│
├── _includes/
│   ├── head.html             # <head> tag: meta, styles, fonts, analytics, MathJax
│   ├── sidebar.html          # Toggleable sidebar nav (from Lanyon)
│   ├── poole.css             # Base Poole theme styles
│   ├── lanyon.css            # Lanyon sidebar/theme styles
│   ├── syntax.css            # Code syntax highlighting
│   ├── custom.css            # Site-specific overrides (warm #fff8df background)
│   └── font.css              # Font declarations
│
├── _plugins/
│   └── tag_generator.rb      # Auto-generates /tags/<slug>/ pages for each tag
│
├── tags/
│   └── index.html            # Tags browse/index page
│
├── public/                   # Static assets (favicon, legacy CSS/JS)
├── assets/                   # Additional assets (images, CSS)
│
├── _site/                    # Jekyll build output (do not edit)
└── .github/
    └── workflows/
        └── jekyll.yml        # CI: build & deploy to GitHub Pages on push to main
```

## Writing Posts

Posts live in `_posts/` and follow the Jekyll naming convention:

```
YYYY-MM-DD-slug-title.md
```

Each post requires front matter:

```yaml
---
layout: post
title: Your Post Title
tags:
    - technology
    - math
---
```

- **Tags** are free-form strings. The `tag_generator.rb` plugin automatically creates a page at `/tags/<slugified-tag>/` for every unique tag used across posts.
- Posts support **MathJax** (LaTeX math rendering) out of the box — just write `$...$` or `$$...$$`.
- HTML `<details>` elements are used in some posts for collapsible sections.

## Layouts Hierarchy

```
compress.html        ← outermost: strips whitespace from HTML output
  └── default.html  ← masthead header + content container
        ├── page.html    ← for static pages (about, 404, etc.)
        ├── post.html    ← for blog posts
        └── tag.html     ← for auto-generated tag pages
```

## Styling

All CSS is **inlined into `<head>`** at build time via Liquid `{% include %}` + `scssify` filter. No external stylesheet requests are made (except Google Fonts). The CSS stack (in order):

1. `poole.css` — base typography, layout, reset
2. `syntax.css` — rouge syntax highlighting
3. `lanyon.css` — sidebar, masthead, toggleable nav
4. `custom.css` — site-specific overrides (warm cream `#fff8df` background)
5. `font.css` — font-face declarations

## Development

### Prerequisites

- Ruby (≥ 3.1 recommended)
- Bundler

### Running locally

```bash
bundle install
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

### Building for production

```bash
bundle exec jekyll build
```

Output goes to `_site/`.

## Deployment

Pushing to the `main` branch triggers the GitHub Actions workflow (`.github/workflows/jekyll.yml`), which:

1. Checks out the repo
2. Sets up Ruby 3.3 with bundler cache
3. Runs `bundle exec jekyll build` with `JEKYLL_ENV=production`
4. Uploads the `_site/` directory as a Pages artifact
5. Deploys to GitHub Pages

The live site is served from the custom domain `journal.francisdb.net` (configured via `CNAME`).

## Key Configuration (`_config.yml`)

| Key | Value |
|---|---|
| `title` | `the journal of francis billones` |
| `url` | `https://journal.francisdb.net` |
| `google_analytics_id` | `G-W21423KMLR` |
| `compress_html` | Enabled (strips comments, whitespace, optional tags) |
| `sass.style` | `compressed` |
| Plugin | `jekyll-feed` |
