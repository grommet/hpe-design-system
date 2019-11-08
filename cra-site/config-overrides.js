// config-overrides.js
// see: https://github.com/timarney/react-app-rewired

const path = require('path');
const fs = require('fs');

const rewireBabelLoader = require('react-app-rewire-babel-loader');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = function override(config, env) {
  config = rewireBabelLoader.include(config, resolveApp('../aries-core'));
  return config;
};
