
import { useAnalytics, Layer } from 'grommet';
import { useRouter } from 'next/router';
import { NavigationMenu } from '@shared/aries-core';
import { navItems } from './navItems.ts';
import { useNavState } from './NavContext';
import { SideNavHeader } from './SideNavHeader';

export const Navigation = ({ ...rest }) => {
  const router = useRouter();
  const sendAnalytics = useAnalytics();
  const {
    navOpen, setNavOpen, isMobile, mobileNavOpen, setMobileNavOpen,
  } = useNavState();

  const activeItem = router.pathname;

  const handleSelect = ({ item, event }) => {
    event.preventDefault();
    router.push(item.url);
    sendAnalytics({ type: 'navItemClick', href: item.url });
    if (isMobile) {
      setMobileNavOpen(false);
    }
  };

  // On mobile, always show nav expanded; Layer controls visibility
  const isOpen = isMobile ? true : navOpen;

  const navMenu = (
    <NavigationMenu
      activeItem={activeItem}
      items={navItems}
      header={<SideNavHeader open={isOpen} setOpen={setNavOpen} />}
      open={isOpen}
      onSelect={handleSelect}
      {...rest}
    />
  );

  // On mobile, render nothing inline; show a full-screen Layer instead
  if (isMobile) {
    if (!mobileNavOpen) return null;
    return (
      <Layer
        onClickOutside={() => setMobileNavOpen(false)}
        position="left"
        onEsc={() => setMobileNavOpen(false)}
      >
        {navMenu}
      </Layer>
    );
  }

  return navMenu;
};
