import { Box, Button, Heading } from 'grommet';
import { Sidebar as SidebarIcon } from 'grommet-icons';
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
      align="center"
      background="background-front"
      gap="medium"
      justify="between"
      pad="small"
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
        alignSelf="end"
        autoFocus={autoFocus}
        icon={<SidebarIcon aria-hidden />}
        onClick={() => setOpen(!open)}
        tip={open ? 'Close navigation' : 'Open navigation'}
      />
    </Box>
  );
};
