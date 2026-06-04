import { useContext } from 'react';
import { Box, ThemeType } from 'grommet';
import { ThemeContext } from 'styled-components';
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
  // ThemeType only includes base grommet edgeSize keys; HPE extends it with
  // additional sizes (e.g. '3xsmall'). The intersection adds them explicitly.
  const theme = useContext(ThemeContext) as ThemeType & {
    global: { edgeSize: Record<string, string> };
  };
  return (
    <Box width={open ? 'small' : undefined} {...rest}>
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
        pad={{ top: '3xsmall', horizontal: 'xsmall', bottom: '3xsmall' }}
        style={{ scrollPaddingTop: theme.global.edgeSize['3xsmall'] }}
        overflow="auto"
      >
        {children}
      </Box>
    </Box>
  );
};
