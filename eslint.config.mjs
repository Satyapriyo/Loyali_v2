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
      // Allow unused variables (can be dangerous in production)
      "@typescript-eslint/no-unused-vars": "off",

      // Allow 'any' type usage (not recommended long-term)
      "@typescript-eslint/no-explicit-any": "off",

      // Allow <img> instead of forcing <Image /> from next/image
      "@next/next/no-img-element": "off",

      // Optional: Don't force const for never-reassigned variables
      "prefer-const": "off",

      // Optional: Relax strict rules for React hooks (use carefully)
      "react-hooks/rules-of-hooks": "off",
    },
  },
];

export default eslintConfig;
