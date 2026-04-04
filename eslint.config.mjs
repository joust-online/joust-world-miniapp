import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      "node_modules/",
      ".next/",
      "contracts/",
      "abis/",
      "prisma/migrations/",
      "next-env.d.ts",
      "generated/",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      // Relax for hackathon — TS compiler catches most of these
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Allow non-null assertions (common with session/env patterns)
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
);
