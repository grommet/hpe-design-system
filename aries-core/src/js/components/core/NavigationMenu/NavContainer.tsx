import { Box, Button, Heading, Sidebar } from 'grommet';
import { Sidebar as SidebarIcon } from 'grommet-icons';
import { ScreenReaderOnly } from '../ScreenReaderOnly';

interface NavContainerProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  [key: string]: any; // Allow other props like pad, width, etc.
}

export const NavContainer = ({
  children,
  open,
  setOpen,
  title,
  ...rest
}: NavContainerProps) => {
  const heading = (
    <Heading level={3} margin="none">
      {title}
    </Heading>
  );

  return (
    <Sidebar
      header={
        <>
          <ScreenReaderOnly>{heading}</ScreenReaderOnly>
          <Box
            direction="row"
            align="center"
            gap="small"
            justify="between"
            pad="small"
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
      }
      pad={{ horizontal: 'small', vertical: 'small' }}
      width={open ? { min: 'small' } : undefined}
      {...rest}
    >
      {children}
    </Sidebar>
  );
};
