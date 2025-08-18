import { useState } from 'react';
import {
  Button,
  Grid,
  Header,
  Main,
  Page,
  PageContent,
  PageHeader,
  Text,
} from 'grommet';
import { AppsRounded as Components, Storage, Network, ShieldSecurity, GenAI, Servers } from 'grommet-icons';
import { NavigationMenu, type NavItemType } from '../../js/components';
import { navItems } from './nav-items';

const gridAreas = [
  ['nav', 'header', 'aside'],
  ['nav', 'main', 'aside'],
];

export const NavigationMenuExample = () => {
  const [activeItem, setActiveItem] = useState<string | undefined>('Home');

  return (
    <Grid
      areas={gridAreas}
      columns={['auto', 'flex', 'auto']}
      rows={['auto', 'flex']}
      border
      height='100vh'
    >
      <NavigationMenu
        gridArea="nav"
        title="My menu's title"
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        items={navItems}
        background="background-front"
      />
      <Header gridArea="header" pad="small">
        <Button onClick={() => setActiveItem('Home')} plain>
          <Text>
            <Text weight="bold">HPE</Text> Design System
          </Text>
        </Button>
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
