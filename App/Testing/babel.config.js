module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    'module:metro-react-native-babel-preset'
  ],
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    ['@babel/plugin-transform-react-jsx', {
      runtime: 'automatic'
    }]
  ]
};
