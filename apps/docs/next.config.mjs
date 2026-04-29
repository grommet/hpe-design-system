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
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // Any other Next.js config options
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    // Next.js built in ESLint conflicts with our custom rules at the monorepo level.
    // "This is not recommended unless you already have ESLint configured to run in 
    // a separate part of your workflow (for example, in CI or a pre-commit hook)."
    // https://nextjs.org/docs/15/app/api-reference/config/next-config-js/eslint
    ignoreDuringBuilds: true,
  },
  output: 'export',
  transpilePackages: ['@shared/aries-core', '@shared/hooks'],
};

export default withMDX(nextConfig);