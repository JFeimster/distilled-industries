import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
export default defineConfig([...nextCoreVitals, ...nextTypescript, globalIgnores([".next/**", "node_modules/**", "next-env.d.ts"])]);
