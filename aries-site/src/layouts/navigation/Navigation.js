import { useState } from 'react';
import { useAnalytics } from 'grommet';
import { useRouter } from 'next/router';
import { NavigationMenu } from '@shared/aries-core';
import { navItems } from './navItems.ts';

export const Navigation = ({ ...rest }) => {
  const [activeItem, setActiveItem] = useState('Home');
  const router = useRouter();
  const sendAnalytics = useAnalytics();

  // Listen for route changes to update active item in navigation
  router.events.on('routeChangeComplete', url => {
    const matchedItem = navItems
      .flatMap(item => item.children || [])
      .find(item => item.url === url);

    if (matchedItem) {
      setActiveItem(matchedItem.label);
    }
  });

  const handleSelect = ({ item, event }) => {
    event.preventDefault();
    router.push(item.url);
    sendAnalytics({ type: 'navItemClick', href: item.url });
    setActiveItem(item.label);
  };

  return (
    <NavigationMenu
      activeItem={activeItem}
      items={navItems}
      onSelect={handleSelect}
      {...rest}
    />
  );
};
