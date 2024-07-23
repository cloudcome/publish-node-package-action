const { defineConfig } = require('eslint-define-config');

/**
 * eslint config
 * @ref https://eslint.org/
 */
module.exports = defineConfig({
    root: true,

    env: {
        browser: true,
        node: true,
        es2022: true,
    },

    ignorePatterns: ['!.*rc.*'],

    overrides: [
        {
            files: ['*.cjs'],
            extends: [
                //
                'eslint:recommended',
                'plugin:import/recommended',
            ],
            rules: {
                'prettier/prettier': 'error',
            },
        },
        {
            files: ['*.ts', '*.mts'],
            parser: '@typescript-eslint/parser',
            extends: [
                //
                'eslint:recommended',
                'plugin:import/recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:prettier/recommended',
            ],
            rules: {
                'prettier/prettier': 'error',
                '@typescript-eslint/no-unused-vars': 'off',
            },
            settings: {
                'import/resolver': {
                    node: true,
                    typescript: true,
                },
            },
        },
    ],
});
