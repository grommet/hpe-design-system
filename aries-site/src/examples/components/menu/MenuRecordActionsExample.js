import { Menu } from 'grommet';
import { More } from 'grommet-icons';

export const MenuRecordActionsExample = ({ bestPractice }) => (
  <Menu
    icon={<More />}
    open={true}
    items={[
      [{ label: 'View', onClick: () => {} }],
      [{ label: 'Update firmware', onClick: () => {} }],
    ]}
  />
);
