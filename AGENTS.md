# AGENTS.md

This file describes the codebase for AI coding assistants.

## Project Overview

This is a personal blog/journal site for Francis Billones, hosted at [journal.francisdb.net](https://journal.francisdb.net). It is a static site built with **Jekyll 4** and a heavily customised version of the [Poole](https://github.com/poole/poole) theme. Some legacy Lanyon assets remain in the repository but are not part of the active layout.

Posts cover topics like technology, math, finance, society, and philosophy.

## Tech Stack

| Layer | Technology |
|---|---|
| Static site generator | Jekyll `~> 4.3` (currently locked to 4.4.x) |
| Language (plugins) | Ruby |
| Templating | Liquid |
| Styling | CSS/SCSS (inlined via the `scssify` filter) |
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
│   ├── head.html             # <head>: metadata, inline styles, theme setup, analytics, optional MathJax
│   ├── sidebar.html          # Legacy Lanyon sidebar; not included by the active layout
│   ├── poole.css             # Base Poole theme styles
│   ├── lanyon.css            # Lanyon sidebar/theme styles
│   ├── syntax.css            # Code syntax highlighting
│   ├── custom.css            # Active site styles, including light/dark themes
│   └── font.css              # Font declarations
│
├── _plugins/
│   └── tag_generator.rb      # Auto-generates /tags/<slug>/ pages for each tag
│
├── tags/
│   └── index.html            # Tags browse/index page
│
├── public/                   # Favicons, active theme-toggle JS, and legacy CSS
├── assets/                   # Post images and duplicate/legacy CSS assets
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
- MathJax is loaded only when a post sets `math: true` in its front matter. On those pages, use `$...$` or `$$...$$` for LaTeX math.
- HTML `<details>` elements are used in some posts for collapsible sections.
- Drafts live in `drafts/`, not Jekyll's special `_drafts/` directory, so they are not included in normal builds.

## Layouts Hierarchy

```
compress.html        ← outermost: strips whitespace from HTML output
  └── default.html  ← masthead header + content container
        ├── page.html    ← for static pages (about, 404, etc.)
        ├── post.html    ← for blog posts
        └── tag.html     ← for auto-generated tag pages
```

## Styling

The active CSS is **inlined into `<head>`** at build time via Liquid `{% include %}` + the `scssify` filter. The active stack, in order, is:

1. `poole.css` — base typography, layout, reset
2. `custom.css` — site-specific layout plus light/dark theme variables
3. `font.css` — font declarations

Google Fonts is the only external stylesheet. `_includes/lanyon.css`, `_includes/syntax.css`, `assets/css/`, and most of `public/css/` are currently legacy or duplicate assets; editing them does not change the rendered site unless they are explicitly included again.

The theme is initialized inline in `_includes/head.html` to avoid a flash of the wrong color scheme. `public/js/theme.js` handles the toggle, persists the user's choice in `localStorage`, and follows system preference until the user makes a selection.

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

To include files from `drafts/` during local preview, run:

```bash
bundle exec jekyll serve --unpublished
```

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
| `title` | `journal.francisdb.net` |
| `url` | `https://journal.francisdb.net` |
| `google_analytics_id` | `G-W21423KMLR` |
| `compress_html` | Enabled (strips comments, whitespace, optional tags) |
| `sass.style` | `compressed` |
| Plugin | `jekyll-feed` |

## Change Guidelines

- Edit source files, never generated output in `_site/`.
- Treat `_includes/poole.css`, `_includes/custom.css`, and `_includes/font.css` as the active stylesheet sources; confirm `_includes/head.html` before modifying similarly named copies elsewhere.
- Preserve existing post URLs by keeping published post filenames stable.
- After layout, plugin, configuration, or styling changes, run `bundle exec jekyll build` and resolve any build errors before finishing.
