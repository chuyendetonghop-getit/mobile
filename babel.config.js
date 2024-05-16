module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '*': ['./src/*'],
          '@api': ['./src/api'],
          '@assets': ['./src/assets'],
          '@components': ['./src/components'],
          '@constants': ['./src/constants'],
          '@hooks': ['./src/hooks'],
          '@navigation': ['./src/navigation'],
          '@redux': ['./src/redux'],
          '@screens': ['./src/screens'],
          '@services': ['./src/services'],
          '@themes': ['./src/themes'],
          '@types': ['src/types'],
          '@utils': ['./src/utils'],
        },
      },
    ],
  ],
};
