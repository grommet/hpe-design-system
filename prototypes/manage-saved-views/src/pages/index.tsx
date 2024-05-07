import { Link } from 'react-router-dom';
import { Card, Box, Button, Grid, Heading, Page, PageContent, PageHeader } from 'grommet';
import { LinkNext } from 'grommet-icons';
import { ContentPane } from '../components';

const Home = () => {
  return (
    <Page>
      <PageContent>
        <PageHeader title="Experiences" />
        <ContentPane>
          <Grid gap="medium" columns={{ size: ['auto', 'medium'], count: 'fit' }}>
            <Button as={Link} to="/devices">
              <Card pad={{ horizontal: 'medium', vertical: 'medium' }}>
                <Box direction='row' gap="medium" justify='between'>
                  <Heading level={2} margin="none" size='small'>Experience A</Heading>
                  <LinkNext color='#f66162' />
                </Box>
              </Card>
            </Button>
            <Button as={Link} to="/devices-b">
              <Card pad={{ horizontal: 'medium', vertical: 'medium' }}>
                <Box direction='row' gap="medium" justify='between'>
                  <Heading level={2} margin="none" size="small">Experience B</Heading>
                  <LinkNext color='#f66162' />
                </Box>
              </Card>
            </Button>
          </Grid>
        </ContentPane>
      </PageContent>
    </Page >
  );
}

export default Home;