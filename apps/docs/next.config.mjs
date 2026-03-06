import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // necessary for table styling
    remarkPlugins: [remarkGfm],
    // necessary with use of `MDXProvider` in _app.js
    providerImportSource: '@mdx-js/react',
  },
});

const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  // Any other Next.js config options
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  output: 'export',
  swcMinify: true,
  transpilePackages: ['@shared/aries-core', '@shared/hooks'],
};

export default withMDX(nextConfig);
