import { Box, Button, Heading } from 'grommet';
import { Sidebar as SidebarIcon } from '@hpe-design/icons-grommet';
import { ScreenReaderOnly } from '../../ScreenReaderOnly';
import { useEffect, useState } from 'react';

interface NavHeaderProps {
  title?: string;
  navigationId?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const NavHeader = ({
  title,
  navigationId,
  open,
  setOpen,
  ...rest
}: NavHeaderProps) => {
  const [autoFocus, setAutoFocus] = useState(false);
  const heading = (
    <Heading level={2} size="small" margin="none">
      {title}
    </Heading>
  );

  // After mount set autoFocus to true
  useEffect(() => {
    setAutoFocus(true);
  }, []);

  return (
    <Box
      direction="row"
      align="center" // Keeps heading vertically centered regardless of length
      background="background-front"
      gap="xxsmall"
      justify="between"
      pad={{
        top: 'xsmall',
        bottom: 'xxsmall',
        horizontal: open ? 'small' : undefined, // figma has this at element.medium.paddingX.default which is 18px, not sure why. Are element tokens supported in grommet-theme-hpe?
      }}
      style={{
        position: 'sticky',
        top: 0,
      }}
      flex={false}
      {...rest}
    >
      {open && heading}
      <Button
        aria-controls={open ? navigationId : undefined}
        aria-expanded={open}
        active={open}
        alignSelf="start" // don't center align when in multi-line heading. Positioning needs to be inline with GlobalHeader elements
        autoFocus={autoFocus}
        icon={<SidebarIcon aria-hidden />}
        onClick={() => setOpen(!open)}
        tip={open ? 'Close navigation' : 'Open navigation'}
      />
    </Box>
  );
};
