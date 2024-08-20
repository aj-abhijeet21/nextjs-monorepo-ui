# @ajabhijeet21-internal/ts-utils

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/abhijeet21/nextjs-monorepo-ui/ci-packages.yml?style=for-the-badge&label=CI)

> **Note**
> This package is part of [abhijeet21/nextjs-monorepo-ui](https://github.com/aj-abhijeet21/nextjs-monorepo-ui).

A package holding some basic typescript utilities: typeguards, assertions...

- [x] Packaged as ES module (type: module in package.json).
- [x] Can be build with tsup (no need if using tsconfig aliases).
- [x] Simple unit tests demo with either Vitest (`yarn test-unit`) or TS-Jest (`yarn test-unit-jest`).

## Install

From any package or apps:

```bash
yarn add @ajabhijeet21-internal/ts-utils@"workspace:^"
```

## Enable aliases

```json5
{
  //"extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@ajabhijeet21-internal/ts-utils": [
        "../../../packages/ts-utils/src/index",
      ],
    },
  },
}
```

## Consume

```typescript
import { isPlainObject } from "@ajabhijeet21-internal/ts-utils";

isPlainObject(true) === false;
```
