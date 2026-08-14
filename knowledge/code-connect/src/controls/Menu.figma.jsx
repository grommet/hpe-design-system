import figma from '@figma/code-connect';
import { Menu } from 'grommet';
import { More } from '@hpe-design/icons-grommet';

const sharedProps = {
  open: figma.boolean('is Open', { true: true, false: undefined }),
  dropProps: figma.enum('Aligned', {
    left: { align: { top: 'bottom', left: 'left' } },
    right: { align: { top: 'bottom', right: 'right' } },
  }),
};

const FIGMA_URL =
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2475-3768';

/**
 * Icon-only variant — trigger is a bold "..." text element, no label
 */
figma.connect(Menu, FIGMA_URL, {
  variant: { 'is Icon Only': 'True' },
  props: sharedProps,
  example: ({ open, dropProps }) => (
    <Menu
      icon={<More />}
      dropProps={dropProps}
      open={open}
      items={[
        [{ label: 'Action 1' }, { label: 'Action 2' }],
        [{ label: 'Secondary 1' }, { label: 'Secondary 2' }],
      ]}
    />
  ),
});

/**
 * Labeled variant — trigger shows a text label with default caret icon
 */
figma.connect(Menu, FIGMA_URL, {
  variant: { 'is Icon Only': 'False' },
  props: sharedProps,
  example: ({ open, dropProps }) => (
    <Menu
      label="Menu"
      dropProps={dropProps}
      open={open}
      items={[
        [{ label: 'Action 1' }, { label: 'Action 2' }],
        [{ label: 'Secondary 1' }, { label: 'Secondary 2' }],
      ]}
    />
  ),
});