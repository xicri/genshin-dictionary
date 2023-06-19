export default {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js",
  },
  moduleFileExtensions: [
    "js",
    "vue",
    "json",
  ],
  transform: {
    "^.+\\.js$": "babel-jest",
    // TODO Temporarily disable vue-jest because it still uses deprecated `babel-core` package and it prevents running Jest properly.
    // see: https://stackoverflow.com/questions/56289348/cannot-find-module-babel-core-but-babel-core-is-installed
    // ".*\\.(vue)$": "vue-jest",
  },
};
