const parserOptions = {
  ecmaVersion: 9,
  sourceType: 'module',
  project: ['./tsconfig.json', '*/tsconfig.json'],
  ecmaFeatures: {
    jsx: true, // Allows for the parsing of JSX
  },
};

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      rules: {
        quotes: [
          2,
          'single',
          {
            avoidEscape: true,
            allowTemplateLiterals: true,
          },
        ],
        'prettier/prettier': [
          'error',
          {
            parser: 'babel-ts',
            trailingComma: 'es5',
            singleQuote: true,
            printWidth: 80,
            arrowParens: 'avoid',
            endOfLine: 'auto',
          },
        ],
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions,
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'prettier/@typescript-eslint',
        'plugin:import/typescript',
      ],
      rules: {
        // these are kinda inaccurate and hard to figure out
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',

        // https://github.com/typescript-eslint/typescript-eslint/pull/688
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            varsIgnorePattern: '^_|slack',
            argsIgnorePattern: '^_',
          },
        ],
        'import/no-useless-path-segments': [
          'error',
          {
            noUselessIndex: true,
          },
        ],
        '@typescript-eslint/no-floating-promises': 'warn',
        // '@typescript-eslint/strict-boolean-expressions': 'warn',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
        '@typescript-eslint/explicit-member-accessibility': [0],
        '@typescript-eslint/explicit-function-return-type': [0],
        '@typescript-eslint/no-explicit-any': [0],
        '@typescript-eslint/camelcase': [0],
      },
    },
    {
      // special rules for react components.
      files: ['web/**/*.tsx'],
      parserOptions,
      extends: ['react-app'],
      rules: {
        // JSX.Element is the implied return type for any react FC
        '@typescript-eslint/explicit-function-return-type': 'off',
        // hooks inherently are never awaited. they're basically fire-and-forget functions
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
      },
    },
  ],
  globals: {},
  env: {
    node: true,
    es6: true,
    browser: true,
    jasmine: true,
  },
};
