import figma from '@figma/code-connect';
import { Tag } from 'grommet';

/**
 * Figma Code Connect mapping for the HPE Design System Tag
 */
figma.connect(
  Tag,
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3039-2385',
  {
    props: {
      name: figma.string('Name'),
      value: figma.string('Value'),
      size: figma.enum('Size', {
        xSmall: 'xsmall',
        small: 'small',
        medium: 'medium',
        large: 'large',
        xLarge: 'xlarge',
      }),
      onClick: figma.enum('is Clickable', {
        true: () => {},
        false: undefined,
      }),
      onRemove: figma.enum('is Removable', {
        true: () => {},
        false: undefined,
      }),
    },
    example: ({ name, value, size, onClick, onRemove }) => (
      <Tag
        name={name}
        value={value}
        size={size}
        onClick={onClick}
        onRemove={onRemove}
      />
    ),
  },
);
