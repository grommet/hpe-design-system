import { Menu } from 'grommet';

export const MenuBatchActionsExample = ({ bestPractice }) => (
  <Menu
    label="Actions"
    open={true}
    items={[
      [{ label: 'View', onClick: () => {} }],
      [{ label: 'Update firmware', onClick: () => {} }],
    ]}
  />
);
