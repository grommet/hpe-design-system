import createTM from 'next-transpile-modules';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const withTM = createTM(['aries-core']);
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // necessary for table styling
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    // necessary with use of `MDXProvider` in _app.js
    providerImportSource: '@mdx-js/react',
  },
});

const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  // Any other Next.js config options
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
};

const plugins = [withTM, withMDX];

const config = () => plugins.reduce((acc, next) => next(acc), nextConfig);

export default config;
