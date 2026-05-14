
import { useContext, useEffect, useState } from 'react';
import { Box, Button, Layer, ResponsiveContext, useAnalytics } from 'grommet';
import { Sidebar } from '@hpe-design/icons-grommet';
import { useRouter } from 'next/router';
import { NavigationMenu } from '@shared/aries-core';
import { navItems } from './navItems.ts';
import { useNavState } from './NavContext';
import { SideNavHeader } from './SideNavHeader';

export const Navigation = ({ ...rest }) => {
  const router = useRouter();
  const sendAnalytics = useAnalytics();
  const { navOpen, setNavOpen } = useNavState();
  const [openLayer, setOpenLayer] = useState(false);
  const breakpoint = useContext(ResponsiveContext);

  const mobile = breakpoint === 'xsmall';
  const activeItem = router.pathname;

  const handleSelect = ({ item, event }) => {
    event.preventDefault();
    router.push(item.url);
    sendAnalytics({ type: 'navItemClick', href: item.url });
  };

  // Close layer when breakpoint changes to non-mobile
  useEffect(() => {
    if (!mobile && openLayer) {
      setOpenLayer(false);
    }
  }, [mobile, openLayer]);

  const navigationMenuProps = {
    activeItem,
    items: navItems,
    header: <SideNavHeader open={navOpen} setOpen={setNavOpen} />,
    open: navOpen,
    onSelect: handleSelect,
    ...rest,
  };

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
              open
              gap="medium"
              width={undefined}
              header={
                <SideNavHeader
                  open
                  setOpen={() => setOpenLayer(false)}
                />
              }
              onSelect={({ item, event }) => {
                handleSelect({ item, event });
                if (!item.children) {
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
