import createTM from 'next-transpile-modules';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const withTM = createTM(['@shared/aries-core']);
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
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // Any other Next.js config options
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    // Next.js built in ESLint conflicts with our custom rules at the monorepo level.
    ignoreDuringBuilds: true,
  },
  output: 'export',
};

const plugins = [withTM, withMDX];

const config = () => plugins.reduce((acc, next) => next(acc), nextConfig);

export default config;
