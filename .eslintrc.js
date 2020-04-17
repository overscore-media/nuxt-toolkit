module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  rules: {
    'vue/html-self-closing': 'off',
    'space-before-function-paren': 'off',
    'quotes': 'off',
    'semi': [2, 'never'],
    'no-unused-vars': 'off',
    'object-shorthand': ['error', 'always'],
    'vue/require-default-prop': 0,
    'vue/no-v-html': 0
  },
  ignorePatterns: ['./markdown.js', 'pages/blog']
}
