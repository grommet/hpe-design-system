// Should be removed if we are using NEXT.js
module.exports = function(api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = ['@babel/plugin-proposal-class-properties'];

  return {
    presets,
    plugins,
  };
};
