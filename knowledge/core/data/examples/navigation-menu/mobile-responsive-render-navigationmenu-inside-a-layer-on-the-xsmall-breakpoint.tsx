import { useContext, useState, useEffect } from 'react';
import { Box, Button, Layer, ResponsiveContext } from 'grommet';
import { Sidebar } from '@hpe-design/icons-grommet';

const NavigationPanel = ({ activeItem, setActiveItem, items }) => {
  const [openLayer, setOpenLayer] = useState(false);
  const breakpoint = useContext(ResponsiveContext);
  const mobile = breakpoint === 'xsmall';

  // Auto-close layer when viewport grows back to desktop
  useEffect(() => {
    if (!mobile && openLayer) setOpenLayer(false);
  }, [mobile, openLayer]);

  const handleSelect = ({ item, event }) => {
    event.preventDefault();
    setActiveItem(item.label);
    // Close drawer after selecting a leaf item on mobile
    if (mobile && !item.children) setOpenLayer(false);
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
          position="left"
          onEsc={() => setOpenLayer(false)}
          onClickOutside={() => setOpenLayer(false)}
        >
          <Box overflow="auto">
            <NavigationMenu
              items={items}
              open={true}
              activeItem={activeItem}
              onSelect={handleSelect}
            />
          </Box>
        </Layer>
      )}
    </>
  ) : (
    <NavigationMenu
      items={items}
      open={true}
      activeItem={activeItem}
      onSelect={handleSelect}
    />
  );
};