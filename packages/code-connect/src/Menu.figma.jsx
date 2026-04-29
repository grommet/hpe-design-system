import figma from '@figma/code-connect';
import { Menu, Text } from 'grommet';

const getMenuItems = ({
  show2ndGroup,
  show3rdGroup,
  show4thGroup,
  show5thGroup,
}) => {
  const items = [
    { label: 'Action 1', onClick: () => {} },
    { label: 'Action 2', onClick: () => {} },
  ];

  if (show2ndGroup) {
    items.push(
      { label: 'Secondary 1', onClick: () => {} },
      { label: 'Secondary 2', onClick: () => {} },
    );
  }

  if (show3rdGroup) {
    items.push(
      { label: 'Tertiary 1', onClick: () => {} },
      { label: 'Tertiary 2', onClick: () => {} },
    );
  }

  if (show4thGroup) {
    items.push({ label: 'Admin Action', onClick: () => {} });
  }

  if (show5thGroup) {
    items.push({ label: 'Danger Action', onClick: () => {} });
  }

  return items;
};

/**
 * Figma Code Connect mapping for the HPE Design System Menu
 */
figma.connect(
  Menu,
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2475-3768',
  {
    props: {
      open: figma.boolean('is Open'),
      show2ndGroup: figma.boolean('show 2nd Group'),
      show3rdGroup: figma.boolean('show 3rd Group'),
      show4thGroup: figma.boolean('show 4th Group'),
      show5thGroup: figma.boolean('show 5th Group'),
      label: figma.enum('is Icon Only', {
        True: '...',
        False: 'Menu',
      }),
      dropAlign: figma.enum('Aligned', {
        left: { top: 'bottom', left: 'left' },
        right: { top: 'bottom', right: 'right' },
      }),
    },
    example: ({
      open,
      show2ndGroup,
      show3rdGroup,
      show4thGroup,
      show5thGroup,
      label,
      dropAlign,
    }) => (
      <Menu
        label={label}
        icon={<Text weight="bold">...</Text>}
        items={getMenuItems({
          show2ndGroup,
          show3rdGroup,
          show4thGroup,
          show5thGroup,
        })}
        open={open}
        dropAlign={dropAlign}
      />
    ),
  },
);
