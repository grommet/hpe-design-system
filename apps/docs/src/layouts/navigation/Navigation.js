import { useAnalytics, Layer } from 'grommet';
import { useRouter } from 'next/router';
import { NavigationMenu } from '@shared/aries-core';
import { navItems } from './navItems.ts';
import { useNavState } from './NavContext';
import { MobileNavHeader } from './MobileNavHeader';
import { SideNavHeader } from './SideNavHeader';

export const Navigation = ({ ...rest }) => {
  const router = useRouter();
  const sendAnalytics = useAnalytics();
  const { navOpen, setNavOpen, isMobile, mobileNavOpen, setMobileNavOpen } =
    useNavState();

  const activeItem = router.pathname;

  const handleSelect = ({ item, event }) => {
    event.preventDefault();
    router.push(item.url);
    sendAnalytics({ type: 'navItemClick', href: item.url });
    if (isMobile) {
      setMobileNavOpen(false);
    }
  };

  // On mobile, render nothing inline; show a full-screen Layer instead
  if (isMobile && !mobileNavOpen) return null;

  if (isMobile) {
    return (
      <Layer
        onClickOutside={() => setMobileNavOpen(false)}
        aria-label="Site navigation"
        position="left"
        onEsc={() => setMobileNavOpen(false)}
      >
        <NavigationMenu
          activeItem={activeItem}
          items={navItems}
          header={<MobileNavHeader />}
          open
          onSelect={handleSelect}
          {...rest}
        />
      </Layer>
    );
  }

  return (
    <NavigationMenu
      activeItem={activeItem}
      items={navItems}
      header={<SideNavHeader open={navOpen} setOpen={setNavOpen} />}
      open={navOpen}
      onSelect={handleSelect}
      {...rest}
    />
  );
};
