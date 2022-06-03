import { Menu } from 'grommet';
import { More } from 'grommet-icons';

export const MenuRecordActionsExample = () => (
  <Menu
    icon={<More />}
    open
    items={[
      [{ label: 'Edit', onClick: () => {} }],
      [
        { label: 'View servers', onClick: () => {} },
        { label: 'Add servers', onClick: () => {} },
        { label: 'Remove servers', onClick: () => {} },
      ],
      [
        { label: 'Update firmware', onClick: () => {} },
        { label: 'Update BIOS settings', onClick: () => {} },
      ],
      [{ label: 'Delete', onClick: () => {} }],
    ]}
  />
);
