import React from 'react';
import { NavigationMenu } from '../js/components';

export const NavigationMenuExample = () => {
  const items = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return <NavigationMenu items={items} />;
};

export default {
  title: 'Navigation',
};
