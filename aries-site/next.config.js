const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const config = {
  async headers() {
    return [
      {
        source: '/(.*)?',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

module.exports = withPlugins(
  [
    [
      withTM,
      {
        transpileModules: ['aries-core'],
      },
    ],
    [
      withMDX,
      {
        pageExtensions: ['js', 'jsx', 'md', 'mdx'],
      },
    ],
  ],
  config,
);
