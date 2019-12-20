/* eslint-disable max-len */
import {
  IconComponents,
  IconDesign,
  IconDevelop,
  IconFoundation,
  IconGuidelines,
  IconResources,
} from '../icons';

export const data = [
  {
    color: 'green',
    icon: <IconGuidelines size="xlarge" />,
    title: 'Guidelines',
    subTitle:
      'Why does HPE have a design system? All the aesthetics, best practices, and information about the platform and how to wield it.',
  },
  {
    color: 'red',
    icon: <IconFoundation size="xlarge" />,
    title: 'Foundation',
    subTitle:
      'These are the core elements of HPE that encompass the voice, language, and visuals that personify our brand and help establish and identify it from the rest of the community.',
  },
  {
    color: 'blue',
    icon: <IconComponents size="xlarge" />,
    title: 'Components',
    subTitle:
      'Our component library provides a vetted set interface elements for use in your applications and websites. Using the latest web technology to keep you compliant and performant.',
  },
  {
    color: 'orange',
    icon: <IconDevelop size="xlarge" />,
    title: 'Develop',
    subTitle:
      'Coding best practices, concepts, and requirements when using the brand for digital experiences.',
  },
  {
    color: 'purple',
    icon: <IconDesign size="xlarge" />,
    title: 'Design',
    subTitle:
      'Starter files, patterns, interactions, and workflows on how to succeed using the design resources from HPE Design System and the HPE Brand.',
  },
  {
    color: 'yellow',
    icon: <IconResources size="xlarge" />,
    title: 'Resources',
    subTitle:
      'Tutorials, case studies, videos, how-to&aposs, articles, upcoming events and more about HPE Design and the Design System from the team.',
  },
];
