import figma from '@figma/code-connect';
import { Button } from 'grommet';

/**
 * Figma Code Connect mapping for the HPE Design System Button
 */
figma.connect(
  Button,
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2133-694',
  {
    props: {
      label: figma.string('Label'),
      primary: figma.enum('Kind', { primary: true }),
      secondary: figma.enum('Kind', { secondary: true }),
      size: figma.enum('Size', {
        xSmall: 'xsmall',
        small: 'small',
        medium: 'medium',
        large: 'large',
        xLarge: 'xlarge',
      }),
      disabled: figma.enum('State', { disabled: true }),
      // Icon position variant
      icon: figma.enum('Icon', {
        left: 'left',
        right: 'right',
        icon: 'icon',
      }),
      // Boolean toggles
      busy: figma.boolean('is Busy'),
      badge: figma.boolean('show Badge'),
      tip: figma.boolean('show Tip', {
        true: { content: 'Tip content' },
        false: undefined,
      }),
    },
    example: ({ label, primary, secondary, size, disabled, busy, tip }) => (
      <Button
        label={label}
        primary={primary}
        secondary={secondary}
        size={size}
        disabled={disabled}
        busy={busy}
        tip={tip}
      />
    ),
  },
);
