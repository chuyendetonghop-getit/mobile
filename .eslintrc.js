module.exports = {
  // fix: ESLint show error in module.export above
  requireConfigFile: false,
  root: true,
  extends: '@react-native',
  // below configuration is to make sure prettier and eslint play nice together on Mac and Windows
  // https://prettier.io/docs/en/options.html#end-of-line
  // https://stackoverflow.com/questions/53516594/why-do-i-keep-getting-eslint-delete-cr-prettier-prettier
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-unused-vars': 'off',
    // 'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
