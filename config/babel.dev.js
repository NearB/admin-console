module.exports = {
  cacheDirectory: true,
  presets: [
    'babel-preset-es2015',
    'babel-preset-es2016',
    'babel-preset-react',
    'babel-preset-react-hmre'
  ].map(require.resolve),
  plugins: [
    'babel-plugin-syntax-trailing-function-commas',
    'babel-plugin-transform-class-properties',
    'babel-plugin-transform-object-rest-spread',
    'react-hot-loader/babel'
  ].map(require.resolve)
};
