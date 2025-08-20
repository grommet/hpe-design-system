import { Box } from 'grommet';
import { NavHeader } from './NavHeader';

interface NavContainerProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  [key: string]: any; // Allow other props like pad, width, etc.
}

export const NavContainer = ({
  children,
  header,
  open,
  setOpen,
  title,
  ...rest
}: NavContainerProps) => {
  return (
    <Box
      pad={{ horizontal: 'small' }}
      width={open ? { min: 'small' } : undefined}
      {...rest}
    >
      {header || <NavHeader title={title} open={open} setOpen={setOpen} />}
      {children}
    </Box>
  );
};
