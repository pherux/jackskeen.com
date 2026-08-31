import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    ".sanity/**",
    ".sanity-dist/**",
    "sanity/schema.json",
    "src/types/sanity.generated.ts",
    "next-env.d.ts",
  ]),
]);
