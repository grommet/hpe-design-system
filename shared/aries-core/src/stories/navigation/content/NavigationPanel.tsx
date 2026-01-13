import { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Layer,
  ResponsiveContext,
} from 'grommet';
import { Sidebar } from '@hpe-design/icons-grommet';
import { useSessionStorage } from '@shared/hooks';
import { NavigationMenu, NavItemType } from '../../../js/components';
import { AppShell, LayerHeader, navItems } from '../content';

export const NavigationPanel = ({
  activeItem,
  setActiveItem,
}: {
  activeItem: string | undefined;
  setActiveItem: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [open] = useSessionStorage<boolean>('open', true);
  const [openLayer, setOpenLayer] = useState<boolean>(false);
  const breakpoint = useContext(ResponsiveContext);

  const mobile = breakpoint === 'xsmall';
  const navTitle = 'Services';
  const onSelect = ({
    item,
    event,
  }: {
    item: NavItemType;
    event: React.MouseEvent | React.KeyboardEvent;
  }) => {
    event.preventDefault();
    setActiveItem(item.label); // or router.push(item.url) for navigation
  };

  const navigationMenuProps = {
    title: navTitle,
    activeItem,
    items: navItems,
    onSelect,
    open,
  };

  const messages = {
    layerOpen: `${navTitle} navigation opened.`,
    layerClose: `${navTitle} navigation closed.`,
  };

  // Remove layer when breakpoint changes to non-mobile
  useEffect(() => {
    if (!mobile && openLayer) {
      setOpenLayer(false);
    }
  }, [mobile, openLayer]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (openLayer) {
  //       announce(messages.layerOpen, 'assertive', 1000);
  //     } else {
  //       announce(messages.layerClose, 'assertive', 1000);
  //     }
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [openLayer, announce, messages]);

  return mobile ? (
    <>
      <Box justify="center" fill pad={{ horizontal: 'xxsmall' }}>
        <Button
          a11yTitle="Open navigation menu"
          icon={<Sidebar />}
          onClick={() => setOpenLayer(true)}
        />
      </Box>
      {openLayer && (
        <Layer
          onEsc={() => setOpenLayer(false)}
          onClickOutside={() => setOpenLayer(false)}
          position="left"
        >
          <Box overflow="auto">
            <NavigationMenu
              {...navigationMenuProps}
              gap="medium"
              width={undefined} // full width when in mobile
              header={
                <LayerHeader
                  onClose={() => setOpenLayer(false)}
                  title={navigationMenuProps.title}
                />
              }
              onSelect={({ item, event }) => {
                onSelect({ item, event });
                // Close the layer when an item is selected, unless it has children
                if (!item.children) {
                  // announce(messages.layerClose, 'assertive', 2000);
                  setOpenLayer(false);
                }
              }}
            />
          </Box>
        </Layer>
      )}
    </>
  ) : (
    <NavigationMenu {...navigationMenuProps} />
  );
};
