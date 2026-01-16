import { Box } from 'grommet';
import { NavItemWithLevel } from '../NavList';
import { GroupHeading } from './GroupHeading';

interface NavGroupProps {
  item: NavItemWithLevel;
  render: (item: NavItemWithLevel) => React.ReactNode;
  defaultItemProps?: { [key: string]: any };
}

export const NavGroup = ({ item, render, defaultItemProps }: NavGroupProps) => {
  const headerId = `${item.label.replace(/\s+/g, '-').toLowerCase()}-heading`;

  return (
    <Box role="none">
      <GroupHeading id={headerId} item={item} />
      <Box
        role="group"
        aria-labelledby={headerId}
        border={{ side: 'bottom', color: 'border-weak' }}
      >
        {item.children?.map(child => (
          <Box key={child.label} {...defaultItemProps}>
            {render(child)}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
