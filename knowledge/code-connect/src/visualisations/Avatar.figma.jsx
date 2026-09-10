import figma from '@figma/code-connect';
import { Avatar, Text } from 'grommet';

const FIGMA_URL =
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2023-48&m=dev';

const sharedProps = {
  size: figma.enum('Size', {
    xSmall: 'xsmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xLarge: 'xlarge',
  }),
};

figma.connect(Avatar, FIGMA_URL, {
  variant: { Kind: 'initials' },
  props: {
    ...sharedProps,
    initials: figma.string('Initials'),
  },
  example: ({ size, initials }) => (
    <Avatar size={size} background="decorative-green">
      <Text size="large" color="text-strong">
        {initials}
      </Text>
    </Avatar>
  ),
});

figma.connect(Avatar, FIGMA_URL, {
  variant: { Kind: 'icon' },
  props: {
    ...sharedProps,
    swapIcon: figma.instance('↪️ swap Icon'),
  },
  example: ({ size, swapIcon }) => <Avatar size={size}>{swapIcon}</Avatar>,
});

figma.connect(Avatar, FIGMA_URL, {
  variant: { Kind: 'image' },
  props: sharedProps,
  example: ({ size }) => (
    <Avatar
      size={size}
      src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"
    />
  ),
});
