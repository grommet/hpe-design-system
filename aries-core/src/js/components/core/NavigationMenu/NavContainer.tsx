import { Button, Sidebar } from 'grommet';
import { Sidebar as SidebarIcon } from 'grommet-icons';

interface NavContainerProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const NavContainer = ({
  children,
  open,
  setOpen,
  ...rest
}: NavContainerProps) => {
  return (
    <Sidebar
      header={
        <Button
          icon={<SidebarIcon />}
          active={open}
          tip={open ? 'Close navigation' : 'Open navigation'}
          alignSelf="end"
          onClick={() => setOpen(!open)}
        />
      }
      pad={{ horizontal: 'small', vertical: 'small' }}
      width={open ? { min: 'small' } : undefined}
      {...rest}
    >
      {children}
    </Sidebar>
  );
};
