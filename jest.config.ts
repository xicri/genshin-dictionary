export default {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
  },
  moduleFileExtensions: [
    "js",
    "ts",
    "vue",
    "json",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
