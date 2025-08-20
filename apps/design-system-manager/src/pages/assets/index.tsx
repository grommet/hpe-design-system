import { Grid, Page, PageContent, PageHeader } from 'grommet';
import { HubItem, ReverseAnchor } from '../../components';
import { AppsRounded, Cube, Resources } from 'grommet-icons';

const assets = [
  {
    label: 'Design tokens',
    href: '/design-tokens',
    icon: <Cube color="purple" size="large" />,
  },
  {
    label: 'Icons',
    href: '/icons',
  },
  {
    label: 'Components',
    href: '/components',
    icon: <AppsRounded color="purple!" size="large" />,
  },
  {
    label: 'Patterns',
    href: '/patterns',
    icon: <Resources color="orange!" size="large" />,
  },
];

const Assets = () => {
  return (
    <Page pad={{ bottom: 'xlarge' }}>
      <PageContent>
        <PageHeader
          title={'Assets'}
          parent={<ReverseAnchor href="/" label="Home" />}
        />
        <Grid
          columns={{ count: 'fit', size: ['small', 'medium'] }}
          gap="medium"
        >
          {assets.map(asset => (
            <HubItem
              key={asset.label}
              href={asset.href}
              label={asset.label}
              icon={asset.icon}
            />
          ))}
        </Grid>
      </PageContent>
    </Page>
  );
};

export default Assets;
