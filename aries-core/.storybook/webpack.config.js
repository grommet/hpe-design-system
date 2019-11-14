module.exports = function({ config }) {
  config.module.rules.push({
    test: /stories\/.*\.js?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  });

  // config.resolve.alias.aries = path.resolve(__dirname, '../src/js');

  return config;
};
