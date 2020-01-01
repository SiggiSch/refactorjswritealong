const jestConfig = {
  globals: {
    "ts-jest": {
      diagnostics: {
        pathRegex: /\.(spec|test)\.ts$/
      }
    }
  },
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: ".spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  // coverageDirectory: "../coverage",
  testEnvironment: "node",
  automock: false,
  verbose: true,
  clearMocks: true
};

// const jestConfig = {
//   // moduleFileExtensions: ["mjs", "js"],
//   // testRegex: ".spec.mjs$",
//   verbose: true,
//   testEnvironment: "node"
//   // automock: false,
//   // testPathIgnorePatterns: ["/node_modules/", "__testIntegration"],
//   // clearMocks: true,
// };

module.exports = jestConfig;
