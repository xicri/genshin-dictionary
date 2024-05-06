# 原神 英語・中国語辞典

原神英語・中国語辞典は、[原神](https://genshin.hoyoverse.com/)に登場する固有名詞の日本語・英語・中国語訳を掲載した、オンライン辞典です。

## 登録単語を追加・編集したい場合

This repository only contains the Web UI for Genshin Dictionary and the translation dataset is in [genshin-langdata](https://github.com/xicri/genshin-langdata) repository. If you want to contribute this project by adding new words or fixing wrong translations, this repository is not the one you are looking for.

## 開発

Genshin Dictionary is a website based on Nuxt 3. You may need experience in (or need to learn) following technology stack to contribute this project:

- JavaScript (ES2015+)
- Nuxt 3
- Vue 3 (Composition API)
- Scss (Understanding for BEM is required)

### Requirements

- Node.js: The latest LTS version recommended
- npm: The latest version recommended
- (Windows only) PowerShell 7+
    - Some npm scripts needs `&&` support

### Setup

```shell
$ cd /path/to/genshin-dictionary
$ npm ci
$ npm run dev
```

Then open http://localhost:3000/ to view your local Genshin Dictionary.

### Test &amp; Lint

```shell
$ npm test
$ npm run lint
```

`npm test` runs E2E tests by Playwright. If you use Linux, you need to install system dependencies. On Ubuntu and Ubuntu-based distributions, you can install dependencies automatically with following command:

```shell
$ sudo npx playwright install-deps
```

### Update translation dataset

Translation dataset is fetched after `npm install` or `npm ci`. To update it, run `npm ci` again.
