# Gothic 2 Pre Alpha

Static website for the Gothic 2 Pre Alpha project, with a changelog panel and
a link to the project repository. Built with Nuxt 4, Nuxt UI, Tailwind CSS,
and Comark, and published on GitHub Pages.

Website: [Gothic 2 Pre Alpha](https://gothic-2-reboot-team.github.io/Gothic-2-Pre-Alpha/).

## Setup

Use the Node.js version specified in `.nvmrc`. With Corepack installed, enable
the pnpm version pinned in `package.json` and install dependencies:

```bash
corepack enable pnpm
corepack install
pnpm install --frozen-lockfile
```

## Development

Start the development server at `http://localhost:3000`:

```bash
pnpm dev
```

## Static generation and preview

Generate the complete static site:

```bash
pnpm generate
```

The generated HTML, CSS, JavaScript, and assets are written to `.output/public`.
This directory can be served by static hosting without a Node.js application
server. Icons are bundled locally and do not require a runtime icon API.

Preview the generated files locally:

```bash
pnpm preview
```

`pnpm static:preview` also serves the generated files. To generate the site
and immediately start its preview server, use:

```bash
pnpm static:build
```

## GitHub Pages deployment

The workflow in `.github/workflows/deploy.yml` runs on pushes to `main` and
can also be started manually from GitHub Actions. It installs dependencies,
runs lint and type checks, generates the site, and publishes `.output/public`.

In the repository's **Settings → Pages**, select **GitHub Actions** as the
deployment source.

The workflow sets `NUXT_APP_BASE_URL=/Gothic-2-Pre-Alpha/` to match the
repository's GitHub Pages address. To generate the same paths locally:

```bash
NUXT_APP_BASE_URL=/Gothic-2-Pre-Alpha/ pnpm generate
```

For a custom domain serving the site at its root, change `NUXT_APP_BASE_URL`
to `/` in the workflow and update `site.url` in `nuxt.config.ts`.

## Changelog

The optional source file is `public/changelog.txt`. It is included during
static generation and converted to Markdown by
`app/composables/useChangelogParser.ts`.

Each release starts with a date in `DD.MM.YYYY` format, followed by category
names ending with a colon and list items starting with `- `:

```text
18.12.2024
-----------
Textures:
- Updated terrain textures
- Fixed **stone wall** textures

Scripts:
- Restored a character
```

Releases are sorted from newest to oldest. Entries sharing a date are merged,
and the newest release receives the `[ LATEST ]` label.

If the file is missing, empty, or contains no valid releases, generation still
succeeds. The changelog panel displays “Could not load the changelog. Please
try again.” and a **Try again** button. The rest of the page remains available.

Changelog content is bundled with the site. To publish changes or restore
a missing changelog, include `public/changelog.txt` in the repository and
regenerate and deploy the site. The retry button reprocesses the bundled content.

List items support Markdown through Comark and Nuxt UI prose components. Raw
HTML, custom components, and attribute syntax are disabled. Allowed tags and
URL protocols are restricted in `app/utils/changelogMarkdown.ts`.

## Configuration

| File                         | Purpose                                                    |
| ---------------------------- | ---------------------------------------------------------- |
| `nuxt.config.ts`             | Static output, site metadata, SEO, icons, and Nuxt modules |
| `app/app.vue`                | Page layout, navigation, and changelog panel toggle        |
| `app/app.config.ts`          | Nuxt UI colors and prose styling                           |
| `app/assets/css/main.css`    | Global styles and colors                                   |
| `app/components/AppLogo.vue` | Logo and project subtitle                                  |
| `app/pages/index.vue`        | Changelog entries, dates, loading, and error states        |
| `public/`                    | Optional changelog, logo, and favicon                      |

The Download button is disabled until a download URL is available.

## Validation

```bash
pnpm run lint
pnpm run typecheck
pnpm generate
```

These are also the checks used by the deployment workflow. To format files
and apply automatic lint fixes, run `pnpm lint:fix`.
