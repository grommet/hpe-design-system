import figma from '@figma/code-connect';
import { Anchor } from 'grommet';

const FIGMA_URL =
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=37187-1324&m=dev';

const sharedProps = {
  label: figma.string('Label'),
  disabled: figma.boolean('is Disabled'),
  reverse: figma.enum('is Reversed', {
    false: false,
    true: true,
  }),
  size: figma.enum('Size', {
    xSmall: 'xsmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xLarge: 'xlarge',
  }),
};

figma.connect(Anchor, FIGMA_URL, {
  variant: { 'has Icon': 'false' },
  props: sharedProps,
  example: ({ label, disabled, reverse, size }) => (
    <Anchor
      href="#"
      label={label}
      disabled={disabled}
      reverse={reverse}
      size={size}
    />
  ),
});

figma.connect(Anchor, FIGMA_URL, {
  variant: { 'has Icon': 'true' },
  props: {
    ...sharedProps,
    icon: figma.instance('Icon Swap'),
  },
  example: ({ label, disabled, reverse, size, icon }) => (
    <Anchor
      href="#"
      label={label}
      disabled={disabled}
      reverse={reverse}
      size={size}
      icon={icon}
    />
  ),
});
