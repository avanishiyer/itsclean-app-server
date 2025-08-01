// eslint.config.js
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended, // or tseslint.configs.strict, etc.
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"], // Or just TypeScript files
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json", // Important for type-aware linting
        tsconfigRootDir: import.meta.dirname,
      },
    },
    //   plugins: {
    //     prettier: prettierPlugin,
    //   },
    //   rules: {
    //     "prettier/prettier": "error",
    //   },
  }
  // eslintConfigPrettier,
);
