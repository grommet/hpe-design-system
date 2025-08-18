import { Box, Button, Text } from 'grommet';
import React from 'react';

interface ActiveMarkerProps {
  active: boolean | undefined;
  hover: boolean | undefined;
}

const ActiveMarker = ({ active, hover }: ActiveMarkerProps) => {
  return (
    <Box
      background={
        active
          ? hover
            ? 'background-primary-strong-hover'
            : 'background-primary-strong'
          : undefined
      }
      fill="vertical"
      pad={{ left: '4px' }}
      round
    />
  );
};

interface ItemLabelProps {
  icon: React.ReactNode;
  label: string;
}

const ItemLabel = ({ icon, label }: ItemLabelProps) => {
  return (
    <Box direction="row" align="center" gap="xsmall" flex>
      {icon}
      <Text color="text-strong">{label}</Text>
    </Box>
  );
};

interface ItemContainerProps {
  active: boolean | undefined;
  children: React.ReactNode;
  gap?: string;
  hover: boolean;
}

const ItemContainer = ({
  active,
  children,
  gap = 'xsmall',
  hover,
  ...rest
}: ItemContainerProps) => {
  return (
    <Box
      direction="row"
      background={active ? 'background-active' : undefined}
      round="xsmall"
      {...rest}
    >
      <Box
        direction="row"
        align="center"
        background={hover ? 'background-hover' : undefined}
        gap={gap}
        pad={{ vertical: 'xsmall', left: 'xsmall', right: 'small' }}
        round="xsmall"
        flex
      >
        <ActiveMarker active={active} hover={hover} />
        {children}
      </Box>
    </Box>
  );
};

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
      <Button
        // href={url}
        plain
        onClick={onClick}
        role="menuitem"
        {...rest}
      >
        {({ hover }) => {
          return (
            <ItemContainer active={active} gap={level ? indent[level] : undefined} hover={hover}>
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
