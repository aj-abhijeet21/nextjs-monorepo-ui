# The web-app

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/abhijeet21/nextjs-monorepo-ui/ci-nextjs-app.yml?style=for-the-badge&label=CI)
![GitHub Workflow E2E Status](https://img.shields.io/github/actions/workflow/status/abhijeet21/nextjs-monorepo-ui/ci-e2e-nextjs-app.yml?style=for-the-badge&label=E2E)

## Intro

Basic demo of a nextjs app, part of the [nextjs-monorepo-example](https://github.com/aj-abhijeet21/nextjs-monorepo-ui).

- Home: [Demo/Vercel](https://monorepo-nextjs-app.vercel.app)
- SSR-I18n: [Demo/Vercel english](https://monorepo-nextjs-app.vercel.app/en/home) | [Demo/vercel french](https://monorepo-nextjs-app.vercel.app/fr/home)
- REST API: [Demo rest/Vercel](https://monorepo-nextjs-app.vercel.app/api/rest/post/1)
- GRAPHIQL (pothos): [Demo/Vercel](https://monorepo-nextjs-app.vercel.app/api/graphql)
- [Changelog](https://github.com/aj-abhijeet21/monorepo-nextjs-app/blob/main/apps/nextjs-app/CHANGELOG.md)

## Quick start

```bash
$ yarn install
$ cd apps/nextjs-app
$ yarn dev
```

### Backend

For rest/api database access be sure to start

```bash
docker-compose up main-db
```

To create the database and seed it: see the [@ajabhijeet21-internal/db-main-prisma README](https://github.com/aj-abhijeet21/nextjs-monorepo-ui/blob/main/packages/db-main-prisma/README.md).

### Features

> Some common features that have been enabled to widen monorepo testing scenarios.

- [x] Api routes: some api routes for rest.
- [x] I18n: based on [next-i18next](https://github.com/isaachinman/next-i18next)
- [x] Styling: [Emotion v11](https://emotion.sh/) support with critical path extraction enabled.
- [x] Styling: [Tailwind v3](https://tailwindcss.com/) with JIT mode enabled and common plugins.
- [x] Security: [next-secure-headers](https://github.com/jagaapple/next-secure-headers) with basic defaults.
- [x] Seo: [next-seo](https://github.com/garmeeh/next-seo)
- [x] Tests: [jest](https://jestjs.io/) + [ts-jest](https://github.com/kulshekhar/ts-jest) + [@testing-library/react](https://testing-library.com/)
- [x] E2E: [Playwright](https://playwright.dev/)

### Monorepo deps

This app relies on packages in the monorepo, see detailed instructions in [README.md](https://github.com/aj-abhijeet21/nextjs-monorepo-ui)

```json5
{
  dependencies: {
    "@ajabhijeet21-internal/core-lib": "workspace:*",
    "@ajabhijeet21-internal/db-main-prisma": "workspace:*",
    "@ajabhijeet21-internal/ui-lib": "workspace:*",
  },
}
```

And their counterparts in [tsconfig.json](./tsconfig.json)

```json5
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@ajabhijeet21-internal/ui-lib/*": ["../../../packages/ui-lib/src/*"],
      "@ajabhijeet21-internal/ui-lib": ["../../../packages/ui-lib/src/index"],
      "@ajabhijeet21-internal/core-lib/*": ["../../../packages/core-lib/src/*"],
      "@ajabhijeet21-internal/core-lib": [
        "../../../packages/core-lib/src/index",
      ],
      "@ajabhijeet21-internal/db-main-prisma/*": [
        "../../../packages/db-main-prisma/src/*",
      ],
      "@ajabhijeet21-internal/db-main-prisma": [
        "../../../packages/db-main-prisma/src/index",
      ],
    },
  },
}
```

## API routes

### Rest api

Try this route http://localhost:3000/api/rest/poem

### Graphql (sdl)

In development just open http://localhost:3000/api/graphql to have the graphiql console.

Try

```gql
query {
  getUser(id: 1) {
    id
    email
  }
}
```

## Some tips

### I18N & typings

Translations are handled by [next-i18next](https://github.com/isaachinman/next-i18next).
See the [next-i18next.config.mjs](./next-i18next.config.mjs).
The keys autocompletion and typechecks are enabled in [./src/types.d/i18next.d.ts](./src/types.d/i18next.d.ts).

## Structure

```
.
├── apps
│   └── nextjs-app
│       ├── public/
│       │   └── locales/
│       ├── src/
│       │   ├── backend/*     (backend code)
│       │   ├── components/*
│       │   ├── features/*    (regrouped by context)
│       │   └── pages/api     (api routes)
│       ├── .env
│       ├── .env.development
│       ├── (.env.local)*
│       ├── next.config.mjs
│       ├── next-i18next.config.mjs
│       ├── tsconfig.json    (local paths enabled)
│       └── tailwind.config.js
└── packages  (monorepo's packages that this app is using)
    ├── core-lib
    ├── main-db-prisma
    └── ui-lib
```

### Develop

```
$ yarn dev
```
