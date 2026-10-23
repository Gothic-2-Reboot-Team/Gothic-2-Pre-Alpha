# Gothic 2 Pre Alpha

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

Use this template to create your own changelog with [Nuxt UI](https://ui.nuxt.com).

- [Live demo](https://changelog-template.nuxt.dev/)
- [Documentation](https://ui.nuxt.com/docs/getting-started/installation/nuxt)

<a href="https://changelog-template.nuxt.dev/" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://ui.nuxt.com/assets/templates/nuxt/changelog-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="https://ui.nuxt.com/assets/templates/nuxt/changelog-light.png">
    <img alt="Nuxt Changelog Template" src="https://ui.nuxt.com/assets/templates/nuxt/changelog-light.png">
  </picture>
</a>

## Quick Start

```bash [Terminal]
pnpm create nuxt@latest -- -t ui/changelog
```

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-name=changelog&repository-url=https%3A%2F%2Fgithub.com%2Fnuxt-ui-templates%2Fchangelog&demo-image=https%3A%2F%2Fui.nuxt.com%2Fassets%2Ftemplates%2Fnuxt%2Fchangelog-dark.png&demo-url=https%3A%2F%2Fchangelog-template.nuxt.dev%2F&demo-title=Nuxt%20Changelog%20Template&demo-description=A%20changelog%20template%20to%20display%20your%20repository%20releases%20notes%20from%20GitHub%20powered%20by%20Comark.)

## Config

The changelog is loaded from `public/changelog.txt` by `app/composables/useChangelog.ts`
and converted to Markdown by `app/composables/useChangelogParser.ts`. Release types
are defined in `app/types.ts`. The `<Markdown>` component from `@comark/nuxt` renders the
content using Nuxt UI prose components, enabled with `ui.prose` in
`nuxt.config.ts`.

Changelog entries support standard Markdown. Raw HTML, custom component syntax,
and attribute syntax are disabled. `app/utils/changelogMarkdown.ts` also restricts
the rendered tags and URL protocols using Comark's security plugin.

Customize prose components through the `ui.prose` key in `app/app.config.ts`:

```ts [app/app.config.ts]
// app/app.config.ts
export default defineAppConfig({
  ui: {
    prose: {
      li: { base: 'break-words' },
      a: { base: 'break-words' },
    },
  },
});
```

## Setup

Use the Node.js version from `.nvmrc`. With Corepack installed, enable the pnpm
version pinned in `package.json`:

```bash
corepack enable pnpm
corepack install
```

> [Read more about Corepack here.](https://nodejs.org/api/corepack.html)

Make sure to install the dependencies:

```bash
pnpm install --frozen-lockfile
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Validation

```bash
pnpm run lint
pnpm run typecheck
pnpm run generate
```

GitHub Actions runs these checks before deployment on pushes to `main` or a
manually triggered run.

The Download button is disabled until a download URL is available. Changelog loading
failures show an error and a retry button.
