// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    rules: {
      indent: ["error", 2], 
      quotes: ["error", "double"],
      "brace-style": ["error", "1tbs"], 
    },
  },
]);