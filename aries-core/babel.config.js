module.exports = function(api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = ['@babel/plugin-proposal-class-properties'];

  /* Ignoring test files, test directories from /dist */
  const ignore = ['src/**/*.test.js', 'src/**/__tests__'];

  return {
    presets,
    plugins,
    ignore,
  };
};
