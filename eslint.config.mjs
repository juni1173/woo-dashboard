import js from "@eslint/js";
import next from "eslint-plugin-next"; // corrected import
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    ...next.configs.recommended,
    rules: {
      ...next.configs.recommended.rules,
      "@next/next/no-img-element": "warn"
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"], //added files section.
    languageOptions: {
      parser: tsparser,
      sourceType: "module",
    },
    plugins: {
        "@typescript-eslint": tseslint,
    },
    rules: {
      "react-hooks/exhaustive-deps": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
];