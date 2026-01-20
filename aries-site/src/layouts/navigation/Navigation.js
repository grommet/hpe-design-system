import { NavigationMenu } from '@shared/aries-core';
import { navItems } from './navItems.ts';

export const Navigation = ({ ...rest }) => {
  return (
    <NavigationMenu
      items={navItems}
      onSelect={({ item, event }) => {
        event.preventDefault();
        console.log(`Navigate to ${item.url}`);
      }}
      {...rest}
    />
  );
};
