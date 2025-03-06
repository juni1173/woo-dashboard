import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import typescript from "@typescript-eslint/eslint-plugin";

const compat = new FlatCompat();

export default [
  js.configs.recommended, // Use recommended JS rules
  ...compat.extends("next/core-web-vitals", "plugin:@typescript-eslint/recommended"),
  next.configs.recommended, // Next.js recommended rules
  typescript.configs["eslint-recommended"], // TypeScript rules
  {
    rules: {
      "react-hooks/exhaustive-deps": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@next/next/no-img-element": "warn",
    },
  },
];
