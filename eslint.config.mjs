import { fixupConfigRules, includeIgnoreFile } from "@eslint/compat";
import { defineConfig } from "eslint/config";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import { fileURLToPath } from "node:url";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  ...fixupConfigRules([coreWebVitals, typescript, prettier]),
]);
