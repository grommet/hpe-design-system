
import { useAnalytics } from 'grommet';
import { useRouter } from 'next/router';
import { NavigationMenu } from '@shared/aries-core';
import { navItems } from './navItems.ts';
import { useNavState } from './NavContext';
import { SideNavHeader } from './SideNavHeader';

export const Navigation = ({ ...rest }) => {
  const router = useRouter();
  const sendAnalytics = useAnalytics();
  const { navOpen, setNavOpen } = useNavState();

  const activeItem = router.pathname;

  const handleSelect = ({ item, event }) => {
    event.preventDefault();
    router.push(item.url);
    sendAnalytics({ type: 'navItemClick', href: item.url });
  };

  return (
    <NavigationMenu
      activeItem={activeItem}
      items={navItems}
      header={<SideNavHeader open={navOpen} setOpen={setNavOpen} />}
      open={navOpen}
      onToggle={setNavOpen}
      onSelect={handleSelect}
      {...rest}
    />
  );
};
