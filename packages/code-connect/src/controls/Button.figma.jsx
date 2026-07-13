import figma from '@figma/code-connect';
import { Button } from 'grommet';

figma.connect(
  Button,
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2133-694',
  {
    props: {
      label: figma.string('Label'),
      primary: figma.enum('Kind', {
        primary: true,
      }),
      secondary: figma.enum('Kind', {
        secondary: true,
      }),
      size: figma.enum('Size', {
        xSmall: 'xsmall',
        small: 'small',
        medium: 'medium',
        large: 'large',
        xLarge: 'xlarge',
      }),
      disabled: figma.enum('State', {
        enabled: false,
        hovered: false,
        focused: false,
        disabled: true,
      }),
      icon: figma.instance('Icon'),
      badge: figma.boolean('show Badge', {
        true: true,
        false: undefined,
      }),
      tip: figma.boolean('show Tip', {
        true: { content: 'Tip' },
        false: undefined,
      }),
    },
    example: ({
      label,
      primary,
      secondary,
      size,
      disabled,
      icon,
      badge,
      tip,
    }) => (
      <Button
        label={label}
        primary={primary}
        secondary={secondary}
        size={size}
        disabled={disabled}
        icon={icon}
        badge={badge}
        tip={tip}
      />
    ),
  },
);