import { Box, Grid, Main, Page, PageContent, PageHeader } from 'grommet';
import { AppsRounded as Components } from 'grommet-icons';
import { NavigationPane, type NavItemType } from '../js/components';

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
      { label: 'Storage', children: [
        { label: 'Block Storage', url: '/block-storage' },
        { label: 'Object Storage', url: '/object-storage' },
        { label: 'File Storage', url: '/file-storage' },
      ] },
      { label: 'Compute', children: [
        { label: 'Virtual Machines', url: '/virtual-machines' },
        { label: 'Containers', url: '/containers' },
      ] },
      { label: 'Networking', children: [
        { label: 'VPC', url: '/vpc' },
        { label: 'Load Balancers', url: '/load-balancers' },
      ] },
      { label: 'Security', children: [
        { label: 'IAM', url: '/iam' },
        { label: 'KMS', url: '/kms' },
      ] },
      { label: 'AI', children: [
        { label: 'Machine Learning', url: '/machine-learning' },
        { label: 'Natural Language Processing', url: '/natural-language-processing' },
      ] },
    ]
  }
];

export const NavigationMenuExample = () => {
  return (
    <Grid
      areas={gridAreas}
      columns={['auto', 'flex', 'auto']}
      rows={['auto', 'flex']}
      border
    >
      <NavigationPane
        gridArea="nav"
        items={navItems}
        background="background-front"
      />
      <Main gridArea="main">
        <Page background="background-back">
          <PageContent>
            <PageHeader title="Navigation" />
          </PageContent>
        </Page>
      </Main>
    </Grid>
  );
};

export default {
  title: 'Navigation',
};
