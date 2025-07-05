import { defineConfig, globalIgnores } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

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
  ]),
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
