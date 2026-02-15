# Genshin Dictionary

Genshin Dictionary (Japanese: 原神英語・中国語辞典) is an online English-Chinese-Japanese dictionary containing the terms in [Genshin Impact](https://genshin.hoyoverse.com/).

## Want to add or modify translations?

This repository only contains the Web UI for Genshin Dictionary and the translation dataset is in [genshin-langdata](https://github.com/xicri/genshin-langdata) repository.
If you want to contribute this project by adding new words or fixing wrong translations, this repository is not the one you are looking for.

## Development

We use the following technology stack in this project:

- TypeScript v5
- Svelte v5
- SvelteKit v2
- Tailwind CSS
  - with some legacy BEM-styled SCSS

### Requirements

- Node.js: The latest LTS version recommended
  - or you can install it via [mise](https://mise.jdx.dev/installing-mise.html)
- (Windows only) PowerShell 7+
  - Some npm scripts needs `&&` support

### Setup

```shell
$ cd /path/to/genshin-dictionary
$ mise install # If you use mise to install Node.js
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
