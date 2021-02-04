import { Brush, Code, Star } from 'grommet-icons';

export const featured = [
  {
    name: 'Designer Guidance',
    description: `Starter files to utilize our resources from HPE
      Design System and HPE Brand.`,
    icon: <Brush size="large" color="text-strong" />,
  },
  {
    name: 'Developer Guidance',
    description: `Resources for setting up your application with
      the HPE Design System library and HPE theme.`,
    icon: <Code size="large" color="text-strong" />,
  },
  {
    name: "What's New",
    description: `Track announcements, new template patterns,
      guidance, and released components.`,
    icon: <Star size="large" color="text-strong" />,
    url: '/whats-new',
  },
];
