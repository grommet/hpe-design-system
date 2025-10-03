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
      pad={{ horizontal: 'xsmall' }}
      width={open ? 'small' : undefined}
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
