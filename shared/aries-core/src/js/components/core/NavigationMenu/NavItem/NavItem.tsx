import React from 'react';
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
  onEsc?: (event: React.KeyboardEvent) => void;
  onSelect?: (event: React.MouseEvent | React.KeyboardEvent) => void;
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
  onEsc,
  onSelect,
  url,
  ref,
  ...rest
}: NavItemProps & { ref?: React.Ref<HTMLButtonElement> }) => {
    return (
      <>
        <Button
          plain
          href={url}
          onKeyDown={event => {
            if (event.key === 'Escape' && typeof onEsc === 'function') {
              onEsc(event);
            }
          }}
          onClick={e => {
            if (typeof onSelect === 'function') {
              onSelect(e);
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
  };
