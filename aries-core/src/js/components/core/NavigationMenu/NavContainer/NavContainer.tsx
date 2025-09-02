import { Box } from 'grommet';
import { NavHeader } from './NavHeader';

interface NavContainerProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  navigationId?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  [key: string]: any; // Allow other props like pad, width, etc.
}

export const NavContainer = ({
  children,
  header,
  navigationId,
  open,
  setOpen,
  title,
  ...rest
}: NavContainerProps) => {
  return (
    <Box
      pad={{ horizontal: 'small' }}
      // replace width with 'small' when grommet-theme-hpe v7 is released.
      width={open ? '256px' : undefined}
      {...rest}
    >
      {header || (
        <NavHeader
          title={title}
          navigationId={navigationId}
          open={open}
          setOpen={setOpen}
        />
      )}
      {children}
    </Box>
  );
};
