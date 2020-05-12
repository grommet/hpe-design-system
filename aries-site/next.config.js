const withTM = require('next-transpile-modules');

module.exports = withTM({
  transpileModules: ['aries-core'],
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
});
