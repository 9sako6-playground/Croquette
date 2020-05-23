module.exports = {
  roots: [
    "./",
  ],
  testMatch: [
    "**/tests/**/*.+(ts|js)",
    "**/?(*.)+(spec|test).+(ts|js)",
  ],
  moduleDirectories: [
    "./",
    "node_modules",
  ],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
};
