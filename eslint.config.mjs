import { defineConfig } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import _import from "eslint-plugin-import";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
    )),

    plugins: {
        react: fixupPluginRules(react),
        import: fixupPluginRules(_import),
        "jsx-a11y": fixupPluginRules(jsxA11Y),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        ecmaVersion: 2021,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "no-unused-vars": "warn",
        "react/jsx-uses-react": "warn",
        "react/jsx-uses-vars": "warn",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "no-unreachable": "off",
        "no-empty": [2, {"allowEmptyCatch": true}],
        // "no-empty": [2, {"exceptions": "catch"}],
        "react/jsx-key": [1, { checkFragmentShorthand: true }],
        "react/no-unescaped-entities": "warn",
        "jsx-a11y/no-redundant-roles": "warn",
        "jsx-a11y/label-has-associated-control": "warn",
        "jsx-a11y/label-has-for": "warn",
        "jsx-a11y/no-noninteractive-element-interactions": "warn",
        "jsx-a11y/click-events-have-key-events": "warn",
        "jsx-a11y/anchor-is-valid": "warn",
        // "jsx-a11y/label-has-for": ["error", {
        //     "required": {
        //     "some": ["nesting", "id"]
        //     }
        // }]
    },
}]);