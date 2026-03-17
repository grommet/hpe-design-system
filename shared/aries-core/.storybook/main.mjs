import { join, dirname, resolve } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const require = createRequire(import.meta.url);

/**
 * Resolve absolute path (needed for Yarn PnP or monorepo packages)
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@vueless/storybook-dark-mode'),
  ],
  features: {
    interactions: false,
    backgrounds: false,
  },
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  swc: () => ({
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
      },
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  webpackFinal: async config => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'apps/docs': resolve(__dirname, '../../../apps/docs'),
      },
      fallback: {
        fs: false,
        assert: false,
        stream: false,
        buffer: false,
        zlib: false,
      },
    };
    config.module.rules.unshift({
      test: /\.(js|tsx?)$/,
      resourceQuery: /raw/, // Matches files imported with ?raw
      type: 'asset/source', // Loads as a raw string
    });
    // Prevent the default JS loaders from also matching ?raw imports
    config.module.rules.forEach(rule => {
      if (
        rule.test instanceof RegExp &&
        rule.test.test('.js') &&
        rule !== config.module.rules[0]
      ) {
        rule.resourceQuery = rule.resourceQuery || { not: [/raw/] };
      }
    });
    return config;
  },
};
export default config;
