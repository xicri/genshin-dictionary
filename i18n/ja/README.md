# 原神 英語・中国語辞典

原神英語・中国語辞典は、[原神](https://genshin.hoyoverse.com/)に登場する固有名詞の日本語・英語・中国語訳を掲載した、オンライン辞典です。

## 登録単語を追加・編集したい場合

このリポジトリには、Genshin Dictionary の Web UI のみが含まれており、翻訳データセットは[genshin-langdata](https://github.com/xicri/genshin-langdata)リポジトリにあります。新しい単語を追加したり、誤った翻訳を修正したりしてこのプロジェクトに貢献したい場合は、このリポジトリは適していません。

## 開発

Genshin Dictionary は Nuxt 3 をベースにしたウェブサイトです。このプロジェクトに貢献するには、次のテクノロジー スタックの経験 (または学習) が必要になる場合があります。

- JavaScript (ES2015+)
- Nuxt 3
- Vue 3 (コンポジション API)
- Scss（BEMの理解が必要）

### 要件

- Node.js: 最新のLTSバージョンを推奨
- npm: 最新バージョンを推奨
- (Windows のみ) PowerShell 7+
    - 一部のnpmスクリプトには`&&`サポートが必要です

### 設定

```shell
$ cd /path/to/genshin-dictionary
$ npm ci
$ npm run dev
```

次に、http://localhost:3000/ を開いて、ローカルの Genshin Dictionary を表示します。

### テストとリント

```shell
$ npm test
$ npm run lint
```

`npm test` Playwright による E2E テストを実行します。Linux を使用する場合は、システムの依存関係をインストールする必要があります。Ubuntu および Ubuntu ベースのディストリビューションでは、次のコマンドで依存関係を自動的にインストールできます。

```shell
$ sudo npx playwright install-deps
```

### 翻訳データセットを更新する

翻訳データセットは`npm install`または`npm ci`の後に取得されます。更新するには、 `npm ci`を再度実行します。
