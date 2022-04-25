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
  async redirects() {
    return [
      {
        source: '/components/table',
        destination: '/components/datatable',
        permanent: true,
      },
      {
        source: '/components/table#what-makes-up-a-table',
        destination: '/components/datatable#what-makes-up-a-datatable',
        permanent: true,
      },
      {
        source: '/components/table#setting-the-width-of-the-table',
        destination: '/components/datatable#setting-the-width-of-a-datatable',
        permanent: true,
      },
      {
        source: '/components/table#table-behaviors-and-actions',
        destination: '/components/datatable#datatable-behaviors-and-actions',
        permanent: true,
      },
      {
        source: '/components/table#searching-and-filtering-tables',
        destination: '/components/datatable#searching-and-filtering-datatables',
        permanent: true,
      },
      {
        source: '/components/table#navigation-via-table',
        destination: '/components/datatable#navigation-via-datatable',
        permanent: true,
      },
      {
        source: `/components/table#use-pagination-or-infinite-scroll-with-
        tables`,
        destination: `/components/datatable#use-pagination-or-infinite-scroll-
        with-datatables`,
        permanent: true,
      },
      {
        source: '/templates/table-customization',
        destination: '/templates/datatable-customization',
        permanent: true,
      },
      {
        source: `/templates/table-customization#what-makes-up-the-customizable-
        table`,
        destination: `/templates/datatable-customization#what-makes-up-the-
        customizable-datatable`,
        permanent: true,
      },
    ];
  },
  webpack5: false,
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
