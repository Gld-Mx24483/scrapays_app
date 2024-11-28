// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   plugins: ['react-native-reanimated/plugin'],
// };

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Add this if you're using TypeScript
    '@babel/plugin-transform-typescript'
  ],
};