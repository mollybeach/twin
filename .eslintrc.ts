// path: .eslintrc.js
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'next'],
    rules: {
        'react/no-unescaped-entities': 'off',
        '@next/next/no-img-element': 'off',
        // Add any custom rules here
    },
    settings: {
        react: {
            version: 'detect',
        },
        next: {
            rootDir: './',
        },
    },
}