import { Box, Grid, Heading, Page, PageContent, PageHeader } from 'grommet';
import { usePocket } from '../../contexts';
import { ScreenReaderOnly, HubItem } from '../../components';

const actions = [
  {
    label: 'Manage assets',
    href: '/assets',
  },
  {
    label: 'Start adoption assessment',
    href: '/adoption',
  },
  {
    label: 'View adoption dashboard',
    href: '/adoption',
  },
];

export const Home = () => {
  const { user } = usePocket();
  const firstName = user?.name?.split(' ')[0];

  return (
    <Page pad={{ bottom: 'xlarge' }} fill>
      <PageContent>
        <ScreenReaderOnly>
          <Heading level={1}>Home page</Heading>
        </ScreenReaderOnly>
        <Box gap="large">
          <PageHeader title={`Hello${firstName ? `, ${firstName}` : '.'}`} />
          <Grid columns={{ count: 'fit', size: 'small' }} gap="medium">
            {actions.map(action => (
              <HubItem
                key={action.label}
                href={action.href}
                label={action.label}
                fill
              />
            ))}
          </Grid>
        </Box>
      </PageContent>
    </Page>
  );
};
