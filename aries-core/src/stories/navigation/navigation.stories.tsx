import { useContext, useEffect, useState } from 'react';
import {
  AnnounceContext,
  Box,
  Button,
  Grid,
  Header,
  Heading,
  Layer,
  Main,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
  Text,
} from 'grommet';
import { ButtonGroup, NavigationMenu } from '../../js/components';
import { navItems } from './nav-items';
import { Close, GenAI, HelpOption, Sidebar } from 'grommet-icons';

const gridAreas = [
  ['nav', 'header', 'aside'],
  ['nav', 'main', 'aside'],
];

const responsiveGridAreas = {
  xsmall: [
    ['nav', 'header', 'aside'],
    ['main', 'main', 'aside'],
  ],
};

export const NavigationMenuExample = () => {
  const [contextContent, setContextContent] = useState('');
  const [activeItem, setActiveItem] = useState<string | undefined>('Home');
  const [openLayer, setOpenLayer] = useState(false);
  const breakpoint = useContext(ResponsiveContext);
  const announce = useContext(AnnounceContext);

  const mobile = breakpoint === 'xsmall';
  const navTitle = "My menu's title";
  const messages = {
    layerOpen: `${navTitle} navigation menu opened.`,
    layerClose: `${navTitle} navigation menu closed.`,
  };

  // Remove layer when breakpoint changes to non-mobile
  useEffect(() => {
    if (!mobile && openLayer) {
      setOpenLayer(false);
    }
  }, [mobile, openLayer]);

  // Announce when layer opens
  useEffect(() => {
    if (openLayer) {
      announce(messages.layerOpen, 'assertive', 2000);
    }
  }, [openLayer, announce, messages.layerOpen]);

  return (
    <Grid
      areas={responsiveGridAreas[breakpoint] || gridAreas}
      columns={['auto', 'flex', 'auto']}
      rows={['auto', 'flex']}
      height="100vh"
    >
      <Box gridArea="nav" as="aside" background="background-front">
        {mobile ? (
          <>
            <Button
              a11yTitle="Open navigation menu"
              icon={<Sidebar />}
              onClick={() => setOpenLayer(true)}
            />
            {openLayer && (
              <Layer
                onEsc={() => setOpenLayer(false)}
                onClickOutside={() => setOpenLayer(false)}
              >
                <Box overflow="auto">
                  <NavigationMenu
                    title={navTitle}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    items={navItems}
                    gap="medium"
                    header={
                      <Header>
                        <Heading level={2} margin="none">My menu's title</Heading>
                        <Button
                          icon={<Close aria-hidden={true} />}
                          a11yTitle="Close navigation menu"
                          onClick={() => {
                            announce(messages.layerClose, 'assertive', 2000);
                            setOpenLayer(false);
                          }}
                        />
                      </Header>
                    }
                    onSelect={() => {
                      announce(`Selected ${activeItem}. ${messages.layerClose}`, 'assertive', 2000);
                      setOpenLayer(false);
                    }}
                  />
                </Box>
              </Layer>
            )}
          </>
        ) : (
          <NavigationMenu
            title={navTitle}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            items={navItems}
          />
        )}
      </Box>
      <Header gridArea="header" pad="small">
        <Button onClick={() => setActiveItem('Home')} plain>
          <Text>
            <Text weight="bold">HPE</Text> Design System
          </Text>
        </Button>
        {breakpoint}
        <ButtonGroup>
          <Button
            a11yTitle="Toggle help content"
            icon={<HelpOption aria-hidden={true} />}
            active={contextContent === 'help'}
            onClick={() =>
              setContextContent(contextContent === 'help' ? '' : 'help')
            }
          />
          <Button
            a11yTitle="Toggle genie content"
            icon={<GenAI aria-hidden={true} />}
            active={contextContent === 'genie'}
            onClick={() =>
              setContextContent(contextContent === 'genie' ? '' : 'genie')
            }
          />
        </ButtonGroup>
      </Header>
      <Main
        gridArea="main"
        background="background-back"
        round={{ corner: 'top-left', size: 'small' }}
      >
        <Page>
          <PageContent>
            <PageHeader title={activeItem} />
          </PageContent>
        </Page>
      </Main>
      {contextContent && (
        <Box gridArea="aside" as="aside" background="background-front">
          {contextContent === 'help' && (
            <Box pad="medium">
              <Heading level={3}>My help content</Heading>
            </Box>
          )}
          {contextContent === 'genie' && (
            <Box pad="medium">
              <Heading level={3}>My genie content</Heading>
            </Box>
          )}
        </Box>
      )}
    </Grid>
  );
};

export default {
  title: 'Navigation',
  component: NavigationMenu,
  parameters: {
    layout: 'fullscreen',
  },
};
