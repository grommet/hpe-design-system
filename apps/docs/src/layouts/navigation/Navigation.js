
import { useAnalytics } from 'grommet';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NavigationMenu } from '@shared/aries-core';
import { BrandIdentity } from '../../components';
import { navItems } from './navItems.ts';
import { useNavState } from './NavContext';

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
      logo={
        <Link href="/" passHref legacyBehavior>
          <BrandIdentity logoOnly />
        </Link>
      }
      open={navOpen}
      onToggle={setNavOpen}
      onSelect={handleSelect}
      {...rest}
    />
  );
};
