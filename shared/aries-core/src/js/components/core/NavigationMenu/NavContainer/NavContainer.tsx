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
  overflow,
  ...rest
}: NavContainerProps) => {
  return (
    <Box
      {...rest}
      direction="column"
      overflow="hidden"
      width={open ? 'small' : undefined}
    >
      {header || (
        <NavHeader
          title={title}
          navigationId={navigationId}
          open={open}
          setOpen={setOpen}
        />
      )}
      {/* Items scroll independently of the sticky header above. pad.top
          ensures the first item's focus ring isn't clipped by the overflow
          boundary when scrollTop is at its floor (0). */}
      <Box
        overflow={overflow ?? 'auto'}
        flex
        pad={{ top: '3xsmall', horizontal: 'xsmall', bottom: '3xsmall' }}
        style={{ scrollPaddingTop: '6px' }}
      >
        {children}
      </Box>
    </Box>
  );
};
