import { Button } from 'grommet';
import { KeyboardType } from 'grommet/utils';
import { forwardRef } from 'react';
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
  onEsc?: KeyboardType | undefined;
  url?: string;
  [key: string]: unknown; // For additional props like 'id', 'aria-label', etc.
}

// Indentation based on level
const indent = {
  1: 'small',
  2: 'medium',
};

export const NavItem = forwardRef<HTMLButtonElement, NavItemProps>(
  (
    {
      active,
      actions,
      children,
      icon,
      label,
      level,
      onClick,
      onEsc,
      url,
      ...rest
    },
    ref,
  ) => {
    return (
      <>
        <Button
          plain
          href={url}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && onEsc) {
              (onEsc as (event: React.KeyboardEvent) => void)(event);
            }
          }}
          onClick={(e) => {
            e.preventDefault(); // Caller handles navigation
            if (typeof onClick === 'function') {
              onClick();
            }
          }}
          role="menuitem"
          ref={ref as any}
          {...(rest as any)}
        >
          {({ hover }) => {
            return (
              <ItemContainer
                active={active as boolean | undefined}
                gap={level ? indent[level as keyof typeof indent] : undefined}
                hover={hover}
              >
                <ItemLabel
                  icon={icon as React.ReactNode}
                  label={label as string}
                />
                {actions as React.ReactNode}
              </ItemContainer>
            );
          }}
        </Button>
        {children}
      </>
    );
  },
);
