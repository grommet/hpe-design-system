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
import { AppsRounded as Components } from 'grommet-icons';
import { NavigationMenu, type NavItemType } from '../js/components';
import { useState } from 'react';

const gridAreas = [
  ['nav', 'header', 'aside'],
  ['nav', 'main', 'aside'],
];

const navItems: NavItemType[] = [
  {
    label: 'Components',
    url: '/components',
    icon: <Components aria-hidden="true" />,
  },
  {
    label: 'Adoption',
    children: [
      { label: 'Teams', url: '/adoption' },
      { label: 'Adoption Levels', url: '/adoption-levels' },
    ],
  },
  {
    label: 'Products',
    children: [
      {
        label: 'Storage',
        children: [
          { label: 'Block Storage', url: '/block-storage' },
          { label: 'Object Storage', url: '/object-storage' },
          { label: 'File Storage', url: '/file-storage' },
        ],
      },
      {
        label: 'Compute',
        children: [
          { label: 'Virtual Machines', url: '/virtual-machines' },
          { label: 'Containers', url: '/containers' },
        ],
      },
      {
        label: 'Networking',
        children: [
          { label: 'VPC', url: '/vpc' },
          { label: 'Load Balancers', url: '/load-balancers' },
        ],
      },
      {
        label: 'Security',
        children: [
          { label: 'IAM', url: '/iam' },
          { label: 'KMS', url: '/kms' },
        ],
      },
      {
        label: 'AI',
        children: [
          { label: 'Machine Learning', url: '/machine-learning' },
          {
            label: 'Natural Language Processing',
            url: '/natural-language-processing',
          },
        ],
      },
    ],
  },
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
};
