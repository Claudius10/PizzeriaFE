module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ['./tsconfig.json', './tsconfig.node.json'],
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        "@typescript-eslint/no-misused-promises": [2, {
            "checksVoidReturn": {
                "attributes": false
            }
        }]
    }
};
