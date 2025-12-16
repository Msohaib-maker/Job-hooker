module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    // Only check for unused imports/variables
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all", // check all variables
        args: "after-used", // check function arguments
        ignoreRestSiblings: true, // ignore {...rest} siblings
      },
    ],
  },
};
