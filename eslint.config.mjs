import { defineConfig, globalIgnores } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import betterTailwind from "eslint-plugin-better-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    "node_modules",
    ".pnp",
    "**/.pnp.js",
    "coverage",
    ".next/",
    "out/",
    "**/.swc",
    "build",
    "**/.DS_Store",
    "**/*.pem",
    "**/npm-debug.log*",
    "**/yarn-debug.log*",
    "**/yarn-error.log*",
    "**/.pnpm-debug.log*",
    "**/.env*.local",
    "**/.vercel",
    "**/*.tsbuildinfo",
    "**/next-env.d.ts",
    "test-results/",
    "playwright-report/",
    "playwright/.cache/",
    "design_handoff_*/",
  ]),
  {
    // Tailwind class checks. Class order is left to prettier-plugin-tailwindcss,
    // and no-unknown-classes is off because custom marker classes (for example
    // `hover` and `tr-gap`) are not registered with Tailwind.
    files: ["**/*.{ts,tsx}"],
    plugins: { "better-tailwindcss": betterTailwind },
    settings: {
      "better-tailwindcss": { entryPoint: "styles/globals.css" },
    },
    rules: {
      "better-tailwindcss/enforce-canonical-classes": "error",
      "better-tailwindcss/no-conflicting-classes": "error",
      "better-tailwindcss/no-duplicate-classes": "error",
    },
  },
  {
    extends: compat.extends("next/core-web-vitals", "next"),

    rules: {
      quotes: ["error", "double"],
      semi: "error",
      "no-undef": "off",

      "keyword-spacing": [
        "error",
        {
          before: true,
        },
      ],

      "key-spacing": [
        "error",
        {
          beforeColon: false,
          afterColon: true,
        },
      ],
    },
  },
]);
