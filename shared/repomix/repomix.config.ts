import { defineConfig } from 'repomix';

const grommetIgnore = [
  '.*',
  '.*/**',
  'e2e/**',
  'storybook/**',
  'tools/**',
  'src/@types/storybook-chromatic/**',
  'src/setupTests.*',
];

type RepoConfigs = {
  [key: string]: {
    fileName: string;
    ignore: string[];
  };
};

const repoConfig: RepoConfigs = {
  grommet: {
    fileName: 'grommet',
    ignore: grommetIgnore,
  },
};

const selectRepo = ({ repoName = 'grommet' }: { repoName?: string }) => {
  return repoConfig[repoName] || repoConfig['grommet'];
};

const config = selectRepo({ repoName: 'grommet' });

export default defineConfig({
  output: {
    filePath: `./contexts/${config.fileName}-repomix-output.xml`,
    style: 'xml',
    parsableStyle: false,
    fileSummary: true,
    removeComments: true,
    tokenCountTree: true,
  },
  ignore: {
    useGitignore: true,
    useDotIgnore: true,
    useDefaultPatterns: true,
    customPatterns: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.git/**',
      '**/.github/**',
      '**/.vscode/**',
      '**/coverage/**',
      '**/.DS_Store',
      '**/*.test.*',
      '**/*.spec.*',
      '**/__tests__/**',
      ...config.ignore,
    ],
  },
});
