import { Brush, Code, Star } from 'grommet-icons';

export const featured = [
  {
    name: 'Designer',
    description: 'Access our Figma UI kits, components, and styles.',
    icon: <Brush size="large" color="text-strong" />,
    label: 'Start designing',
    url: '/foundation/designer-guidance',
  },
  {
    name: 'Developer',
    description: 'Find guides, tools, and docs to get your app running.',
    icon: <Code size="large" color="text-strong" />,
    label: 'Get the code',
    url: '/foundation/developer-guidance',
  },
  {
    name: 'Migrate',
    description: 'Bring your existing apps to the HPE design system',
    icon: <Star size="large" color="text-strong" />,
    label: 'Migration resources',
    url: '/design-tokens',
  },
];
