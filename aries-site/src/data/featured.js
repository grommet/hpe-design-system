import { Brush, Code, StarFill } from '@hpe-design/icons-grommet';

export const featured = [
  {
    name: 'Designer guidance',
    description: `Starter files to utilize our resources from HPE
      Design System and HPE Brand.`,
    icon: <Brush size="large" color="text-strong" />,
  },
  {
    name: 'Developer guidance',
    description: `Resources for setting up your application with
      the HPE Design System library and HPE theme.`,
    icon: <Code size="large" color="text-strong" />,
  },
  {
    name: "What's new",
    description: `Track announcements, new template patterns,
      guidance, and released components.`,
    icon: <StarFill size="large" color="text-strong" />,
    url: '/whats-new',
  },
];
