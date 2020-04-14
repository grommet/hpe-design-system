const withPlugins = require('next-compose-plugins');

const withTM = require('next-transpile-modules');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins(
  [
    [
      withTM,
      {
        transpileModules: ['aries-core'],
      },
    ],
    optimizedImages,
  ],
  {},
);

