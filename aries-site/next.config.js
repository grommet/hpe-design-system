const withTM = require('next-transpile-modules');

module.exports = withTM({
  transpileModules: ['aries-core'],
});
