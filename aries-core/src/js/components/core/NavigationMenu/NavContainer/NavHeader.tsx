import { Box, Button, Heading } from 'grommet';
import { Sidebar as SidebarIcon } from 'grommet-icons';
import { ScreenReaderOnly } from '../../ScreenReaderOnly';

interface NavHeaderProps {
  title?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const NavHeader = ({ title, open, setOpen, ...rest }: NavHeaderProps) => {
  const heading = (
    <Heading level={2} size="small" margin="none">
      {title}
    </Heading>
  );

  return (
    <>
      {!open && <ScreenReaderOnly>{heading}</ScreenReaderOnly>}
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
          icon={<SidebarIcon />}
          active={open}
          tip={open ? 'Close navigation' : 'Open navigation'}
          alignSelf="end"
          onClick={() => setOpen(!open)}
        />
      </Box>
    </>
  );
};
