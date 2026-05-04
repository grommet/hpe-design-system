import figma from '@figma/code-connect';
import { Tag } from 'grommet';

const FIGMA_URL =
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3039-2385';

const sharedProps = {
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
  onRemove: figma.boolean('is Removable', {
    true: () => {},
    false: undefined,
  }),
};

/**
 * Tag with name label visible
 */
figma.connect(Tag, FIGMA_URL, {
  variant: { 'show Name': 'True' },
  props: {
    ...sharedProps,
    name: figma.string('Name'),
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
});

/**
 * Tag without name label (value only)
 */
figma.connect(Tag, FIGMA_URL, {
  variant: { 'show Name': 'False' },
  props: sharedProps,
  example: ({ value, size, onClick, onRemove }) => (
    <Tag value={value} size={size} onClick={onClick} onRemove={onRemove} />
  ),
});
