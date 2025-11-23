module.exports = {
	env: {
		browser: true,
		es2022: true,
		node: true,
	},
	extends: ['next', 'next/core-web-vitals', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {jsx: true},
		ecmaVersion: 13,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: ['prettier', 'simple-import-sort', 'import', '@typescript-eslint'],
	ignorePatterns: ['**/*.js'],
	rules: {
		// Imports
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',

		// Next.js
		'@typescript-eslint/triple-slash-reference': 'off',
		'react/react-in-jsx-scope': 'off',

		// Prettier handles these
		// 'prettier/prettier': 'error',
		'@typescript-eslint/comma-dangle': 'off',
		'react/function-component-definition': 'off',
		'react/jsx-tag-spacing': 'off',
		'react/no-unescaped-entities': 'off',
		'no-mixed-operators': 'off',
		'operator-linebreak': 'off',
		'@typescript-eslint/naming-convention': 'off',
		'quote-props': 'off',
		'@typescript-eslint/quotes': 'off',
		'react/jsx-curly-newline': 'off',
		'@typescript-eslint/indent': 'off',
		'jsx-quotes': 'off',

		// Bad rule
		'@typescript-eslint/parameter-properties': 'off',
		'@typescript-eslint/ban-types': 'off',

		// Custom JSX
		'react/button-has-type': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'@typescript-eslint/no-implicit-any-catch': 'off',
		'new-cap': 'off',
		'no-warning-comments': 'off',
		'capitalized-comments': 'off',
	},
};
