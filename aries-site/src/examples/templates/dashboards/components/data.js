import { Button } from 'grommet';
import styled from 'styled-components';
import {
  DocumentUpdate,
  Group,
  Aruba,
  PhoneVertical,
  ShieldSecurity,
  Support,
  UserAdd,
} from 'grommet-icons';

// styled component to create custom orange button
const StyledButton = styled(Button)`
  background: ${props => props.theme.global.colors['orange!']};
  color: ${props => props.theme.global.colors['text-strong'].light};
  &:hover {
    background: ${props => props.theme.global.colors['orange!']};
    color: ${props => props.theme.global.colors['text-strong'].light};
  }
`;

export const data = [
  {
    cta: <StyledButton label="Launch" />,
    background: 'yellow',
    title: 'Aruba Network Manager',
    description: `Network configuration and operations made simple. Your 
    network on a single pane of glass.`,
    descriptionColor: 'text-strong',
    icon: <Aruba color="plain" />,
  },
  {
    cta: 'Explore guides',
    title: 'Guides and resources',
    description:
      'Stay informed with how-to guides, resources, and documentation.',
    icon: <Support color="purple!" />,
  },
  {
    cta: 'Send an invite',
    title: 'Invite users ',
    description:
      'Send a sign-up link to users so you can collaborate with your team.',
    icon: <Group color="orange!" />,
  },
  {
    cta: 'Assign roles',
    title: 'Assign user access',
    description: 'Assign a custom role or built-in roles to your account.',
    icon: <UserAdd color="yellow!" />,
  },
  {
    cta: 'Set up SAML SSO',
    title: 'Add a SSO/SAML connection',
    description: `Easily add extra protection to your HPE Account by connecting 
    to your company's IDP.`,
    icon: <ShieldSecurity color="blue!" />,
  },
  {
    cta: 'Enable MFA',
    title: 'Set up multi-factor authentication  ',
    description:
      'Easily add extra protection by requiring access to your phone.',
    icon: <PhoneVertical color="purple!" />,
  },
  {
    cta: 'Release notes',
    title: 'Get release notes',
    description:
      'Stay up to date with the latest release notes from HPE Common Cloud.',
    icon: <DocumentUpdate color="blue!" />,
  },
];
