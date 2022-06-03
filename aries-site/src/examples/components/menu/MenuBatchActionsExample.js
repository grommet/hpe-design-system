import { Menu } from 'grommet';

export const MenuBatchActionsExample = () => (
  <Menu
    label="Actions"
    open={true}
    items={[
      { label: 'Power on', onClick: () => {} },
      { label: 'Power off', onClick: () => {} },
      { label: 'Reset', onClick: () => {} },
      { label: 'Update firmware', onClick: () => {} },
      { label: 'Add to group', onClick: () => {} },
    ]}
  />
);
