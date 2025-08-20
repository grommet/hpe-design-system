import { Button } from 'grommet';
import { ItemContainer } from './ItemContainer';
import { ItemLabel } from './ItemLabel';

export type NavItemType = {
  label: string;
  url?: string;
  icon?: React.ReactNode;
  children?: NavItemType[];
};

interface NavItemProps {
  active?: boolean;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label: string;
  level?: 1 | 2;
  onClick?: () => void;
  url?: string;
  [key: string]: unknown; // For additional props like 'id', 'aria-label', etc.
}

// Indentation based on level
const indent = {
  1: 'small',
  2: 'medium',
};

export const NavItem = ({
  active,
  actions,
  children,
  icon,
  label,
  level,
  onClick,
  url,
  ...rest
}: NavItemProps) => {
  return (
    <>
      <Button plain onClick={onClick} role="menuitem" {...rest}>
        {({ hover }) => {
          return (
            <ItemContainer
              active={active}
              gap={level ? indent[level] : undefined}
              hover={hover}
            >
              <ItemLabel icon={icon} label={label} />
              {actions}
            </ItemContainer>
          );
        }}
      </Button>
      {children}
    </>
  );
};
