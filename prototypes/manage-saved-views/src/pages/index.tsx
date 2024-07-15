import { Link } from 'react-router-dom';
import { Card, Box, Button, Grid, Heading, Page, PageContent, PageHeader } from 'grommet';
import { LinkNext } from 'grommet-icons';
import { ContentPane } from '../components';

export const experiences = {
  a: { name: 'XCR' },
  b: { name: 'PWK' }
};

interface RoutedButtonProps extends React.ComponentProps<typeof Button> {
  to: string;
}

const RoutedButton = ({ ...rest }: RoutedButtonProps) => (
  <Button {...rest} />
);

const Home = () => {
  return (
    <Page>
      <PageContent>
        <PageHeader title="Experiences" />
        <ContentPane contain={false}>
          <Grid gap="medium" columns={{ size: ['auto', 'medium'], count: 'fit' }}>
            <RoutedButton as={Link} to={`/devices?exp=${experiences.a.name}`} >
              <Card pad={{ horizontal: 'medium', vertical: 'medium' }}>
                <Box direction='row' gap="medium" justify='between'>
                  <Heading level={2} margin="none" size='small'>Experience {experiences.a.name}</Heading>
                  <LinkNext color='#f66162' />
                </Box>
              </Card>
            </RoutedButton>
            <RoutedButton as={Link} to={`/devices?exp=${experiences.b.name}`}>
              <Card pad={{ horizontal: 'medium', vertical: 'medium' }}>
                <Box direction='row' gap="medium" justify='between'>
                  <Heading level={2} margin="none" size="small">Experience {experiences.b.name}</Heading>
                  <LinkNext color='#f66162' />
                </Box>
              </Card>
            </RoutedButton>
          </Grid>
        </ContentPane>
      </PageContent>
    </Page >
  );
}

export default Home;