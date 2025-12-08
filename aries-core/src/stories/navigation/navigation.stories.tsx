import { useContext, useEffect, useState } from 'react';
import {
  AnnounceContext,
  Box,
  Button,
  Grid,
  Layer,
  Main,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
} from 'grommet';
import { Sidebar } from '@hpe-design/icons-grommet';
import { useSessionStorage } from '@shared/hooks';
import { NavigationMenu } from '../../js/components';
import { AppHeader, Genie, Help, LayerHeader, navItems } from './content';

const gridAreas = [
  ['nav', 'header', 'context-pane'],
  ['nav', 'main', 'context-pane'],
];

const responsiveGridAreas = {
  xsmall: [
    ['nav', 'header', 'context-pane'],
    ['main', 'main', 'context-pane'],
  ],
};

const NavigationMenuExample = () => {
  const [contextContent, setContextContent] = useSessionStorage(
    'contextContent',
    '',
  );
  const [activeItem, setActiveItem] = useSessionStorage<string | undefined>(
    'activeItem',
    'Home',
  );
  const [open, setOpen] = useSessionStorage<boolean>('open', true);
  const [openLayer, setOpenLayer] = useState<boolean>(false);
  const breakpoint = useContext(ResponsiveContext);
  const announce = useContext(AnnounceContext);

  const mobile = breakpoint === 'xsmall';
  const navTitle = 'Services';

  const navigationMenuProps = {
    title: navTitle,
    activeItem,
    setActiveItem,
    items: navItems,
    open,
    setOpen,
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

  return (
    <Grid
      areas={responsiveGridAreas[breakpoint] || gridAreas}
      columns={['auto', 'flex', 'auto']}
      rows={['auto', 'flex']}
      height="100vh"
    >
      <Box
        gridArea="nav"
        as="aside"
        aria-label="navigation"
        background="background-front"
      >
        {mobile ? (
          <>
            <Box justify="center" fill pad={{ horizontal: '3xsmall' }}>
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
                    header={<LayerHeader onClose={() => setOpenLayer(false)} />}
                    onSelect={() => {
                      // announce(messages.layerClose, 'assertive', 2000);
                      setOpenLayer(false);
                    }}
                  />
                </Box>
              </Layer>
            )}
          </>
        ) : (
          <NavigationMenu {...navigationMenuProps} />
        )}
      </Box>
      <AppHeader
        gridArea="header"
        contextContent={contextContent}
        setContextContent={setContextContent}
        setActiveItem={setActiveItem}
      />
      <Main
        gridArea="main"
        background="background-back"
        round={{ corner: 'top-left', size: 'medium' }}
      >
        <Page>
          <PageContent>
            <PageHeader title={activeItem} />
          </PageContent>
        </Page>
      </Main>
      {contextContent && (
        <Box gridArea="context-pane" as="aside" background="background-front">
          {contextContent === 'help' && <Help />}
          {contextContent === 'genie' && <Genie />}
        </Box>
      )}
    </Grid>
  );
};

const meta = {
  title: 'Navigation',
  component: NavigationMenu,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Navigation = {
  render: () => <NavigationMenuExample />,
};
