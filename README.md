# Genshin Dictionary

Genshin Dictionary (Japanese: 原神英語・中国語辞典) is an online English-Chinese-Japanese dictionary containing the terms in [Genshin Impact](https://genshin.hoyoverse.com/).

## Want to add or modify translations?

This repository only contains the Web UI for Genshin Dictionary and the translation dataset is in [genshin-langdata](https://github.com/xicri/genshin-langdata) repository.
If you want to contribute this project by adding new words or fixing wrong translations, this repository is not the one you are looking for.

## Development

Genshin Dictionary is a website based on Nuxt 3.
You may need experience in (or need to learn) following technology stack to contribute this project:

- JavaScript (ES2015+)
- Nuxt 3
- Vue 3 (Composition API)
- Scss (Understanding for BEM is required)

### Requirements

- Node.js: The latest LTS version recommended
- (Windows only) PowerShell 7+
  - Some npm scripts needs `&&` support

### Setup

```shell
$ cd /path/to/genshin-dictionary
$ pnpm install
$ pnpm dev
```

Then open http://localhost:3000/ to view your local Genshin Dictionary.

### Test & Lint

```shell
$ pnpm test
$ pnpm lint
```

`pnpm test` runs E2E tests by Playwright.
If you use Linux, you need to install system dependencies.
On Ubuntu and Ubuntu-based distributions, you can install dependencies automatically with following command:

```shell
$ sudo pnpm playwright install-deps
```

### Update translation dataset

Translation dataset is fetched after `pnpm install`. To update it, run `pnpm install` again.
