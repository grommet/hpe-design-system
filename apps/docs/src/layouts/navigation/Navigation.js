
import PropTypes from 'prop-types';
import { useAnalytics } from 'grommet';
import { useRouter } from 'next/router';
import { NavigationMenu } from '@shared/aries-core';
import { navItems } from './navItems.ts';
import { SideNavHeader } from './SideNavHeader';

export const Navigation = ({ navOpen, setNavOpen, ...rest }) => {
  const router = useRouter();
  const sendAnalytics = useAnalytics();

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
      onSelect={handleSelect}
      {...rest}
    />
  );
};

Navigation.propTypes = {
  navOpen: PropTypes.bool.isRequired,
  setNavOpen: PropTypes.func.isRequired,
};
