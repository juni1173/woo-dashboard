import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  next.configs.recommended,
  {
    languageOptions: {
      parser: tsparser,
      sourceType: "module",
    },
    rules: {
      "react-hooks/exhaustive-deps": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@next/next/no-img-element": "warn",
    },
  },
];
