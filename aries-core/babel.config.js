module.exports = function(api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = ['@babel/plugin-proposal-class-properties'];

  const ignore = [
    'src/**/*.test.js', // test.js files
    'src/**/__tests__', // __test__ directories
    'src/**/stories', // stories directories
  ];

  return {
    presets,
    plugins,
    ignore,
  };
};
