import { useState } from 'react';
import { useAnalytics } from 'grommet';
import { useRouter } from 'next/router';
import { NavigationMenu } from '@shared/aries-core';
import { navItems } from './navItems.ts';

export const Navigation = ({ ...rest }) => {
  const [activeItem, setActiveItem] = useState('Home');
  const router = useRouter();
  const sendAnalytics = useAnalytics();

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
