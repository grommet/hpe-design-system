export const scaleDuelDoubling = {
  name: 'Duel-Doubling',
  description:
    '24px based scale at 2.0 factor + 16px based scale at 2.0. Rounded to 8px grid unit with 30 steps',
  settings: {
    base: '24 & 16',
    contentBase: 384,
    factor: 2.0,
    steps: '22',
    nearest: 8,
  },
  scale: [
    1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768,
    1024, 1536, 2048,
  ],
  content: [
    {
      size: '5xsmall',
      value: 48,
    },
    {
      size: '4xsmall',
      value: 64,
    },
    {
      size: '3xsmall',
      value: 96,
    },
    {
      size: 'xxsmall',
      value: 128,
    },
    {
      size: 'xsmall',
      value: 192,
    },
    {
      size: 'small',
      value: 256,
    },
    {
      size: 'medium',
      value: 384,
    },
    {
      size: 'large',
      value: 512,
    },
    {
      size: 'xlarge',
      value: 768,
    },
    {
      size: 'xxlarge',
      value: 1024,
    },
    {
      size: '3xlarge',
      value: 1536,
    },
    {
      size: '4xlarge',
      value: 2048,
    },
  ],
  spacing: [
    {
      size: '5xsmall',
      value: 3,
    },
    {
      size: '4xsmall',
      value: 4,
    },
    {
      size: '3xsmall',
      value: 6,
    },
    {
      size: 'xxsmall',
      value: 8,
    },
    {
      size: 'xsmall',
      value: 12,
    },
    {
      size: 'small',
      value: 16,
    },
    {
      size: 'medium',
      value: 24,
    },
    {
      size: 'large',
      value: 32,
    },
    {
      size: 'xlarge',
      value: 48,
    },
    {
      size: 'xxlarge',
      value: 64,
    },
    {
      size: '3xlarge',
      value: 96,
    },
    {
      size: '4xlarge',
      value: 128,
    },
    {
      size: '5xlarge',
      value: 192,
    },
  ],
};
