import figma from '@figma/code-connect';
import { Button } from 'grommet';
import { Add } from '@hpe-design/icons-grommet';

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
      active: figma.enum('State', { active: true }),
      // Icon position: 'none' produces undefined (no icon prop), others show <Add />
      // 'right' also sets reverse={true} to place icon after label
      icon: figma.enum('Icon', {
        left: <Add />,
        right: <Add />,
        icon: <Add />,
      }),
      reverse: figma.enum('Icon', {
        right: true,
      }),
      // Boolean toggles
      busy: figma.boolean('is Busy'),
      badge: figma.boolean('show Badge', {
        true: true,
        false: undefined,
      }),
      tip: figma.boolean('show Tip', {
        true: { content: 'Tip content' },
        false: undefined,
      }),
    },
    example: ({
      label,
      primary,
      secondary,
      size,
      disabled,
      active,
      icon,
      reverse,
      busy,
      badge,
      tip,
    }) => (
      <Button
        label={label}
        primary={primary}
        secondary={secondary}
        size={size}
        disabled={disabled}
        active={active}
        icon={icon}
        reverse={reverse}
        busy={busy}
        badge={badge}
        tip={tip}
      />
    ),
  },
);
