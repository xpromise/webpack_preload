module.exports = {
  extends: ["eslint:recommended"],
  parser: "@babel/eslint-parser",
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "no-var": 2,
  },
  plugins: ["import"],
};
