// NavigationPanel.tsx
import { useContext, useState, useEffect } from 'react';
import { Box, Button, Layer, Nav, Anchor, ResponsiveContext } from 'grommet';
import { Menu } from '@hpe-design/icons-grommet';

export const NavigationPanel = ({ activeItem, setActiveItem, items }) => {
  const [openLayer, setOpenLayer] = useState(false);
  const breakpoint = useContext(ResponsiveContext);
  const mobile = breakpoint === 'xsmall';

  // Close layer when switching to desktop
  useEffect(() => {
    if (!mobile && openLayer) setOpenLayer(false);
  }, [mobile, openLayer]);

  const NavigationContent = (
    <Nav gap="small">
      {items.map(item => (
        <Anchor
          key={item.label}
          label={item.label}
          onClick={() => {
            setActiveItem(item.label);
            if (mobile) setOpenLayer(false);
          }}
        />
      ))}
    </Nav>
  );

  return mobile ? (
    <>
      <Box justify="center" fill pad={{ horizontal: 'xxsmall' }}>
        <Button
          icon={<Menu />}
          onClick={() => setOpenLayer(true)}
        />
      </Box>
      {openLayer && (
        <Layer
          onEsc={() => setOpenLayer(false)}
          onClickOutside={() => setOpenLayer(false)}
          position="left"
        >
          <Box width="medium" pad="medium">
            {NavigationContent}
          </Box>
        </Layer>
      )}
    </>
  ) : (
    NavigationContent
  );
};