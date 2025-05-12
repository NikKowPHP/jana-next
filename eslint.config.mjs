import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Add custom rules or override existing ones here to make ESLint less strict
      // Examples:
      // "@typescript-eslint/no-unused-vars": "warn", // Allow unused variables with a warning
      // "@typescript-eslint/explicit-function-return-type": "off", // Do not require explicit function return types
      // "react/display-name": "off", // Do not require display name for React components
      "@typescript-eslint/no-explicit-any": "warn", // Allow the use of 'any' with a warning
    },
  },
];

export default eslintConfig;
