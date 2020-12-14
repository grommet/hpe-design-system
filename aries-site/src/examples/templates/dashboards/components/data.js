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
    cta: 'Explore Guides',
    title: 'Guides & Resources',
    description:
      'Stay informed with how-to guides, resources, and documentation.',
    icon: <Support color="purple!" />,
  },
  {
    cta: 'Send an Invite',
    title: 'Invite Users ',
    description:
      'Send a sign-up link to users so you can collaborate with your team.',
    icon: <Group color="orange!" />,
  },
  {
    cta: 'Assign Roles',
    title: 'Assign User Access',
    description: 'Assign a custom role or built-in roles to your account.',
    icon: <UserAdd color="yellow!" />,
  },
  {
    cta: 'Set Up SAML SSO',
    title: 'Add a SSO/SAML Connection',
    description: `Easily add extra protection to your HPE Account by connecting 
    to your company's IDP.`,
    icon: <ShieldSecurity color="blue!" />,
  },
  {
    cta: 'Enable MFA',
    title: 'Setup Multi-Factor Authentication  ',
    description:
      'Easily add extra protection by requiring access to your phone.',
    icon: <PhoneVertical color="purple!" />,
  },
  {
    cta: 'Release Notes',
    title: 'Get Release Notes',
    description:
      'Stay up to date with the latest release notes from HPE Common Cloud.',
    icon: <DocumentUpdate color="blue!" />,
  },
];
