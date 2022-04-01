import {
  Anchor,
  Box,
  Footer,
  Header,
  Heading,
  Main,
  Nav,
  Page,
  PageContent,
  Paragraph,
} from 'grommet';

export const PageSimple = () => (
  <Page>
    <PageContent>
      <Header pad={{ vertical: 'medium' }}>
        <Box>
          <Heading size="small" margin="none">
            Datasets
          </Heading>
          <Paragraph>
            Explore, analyze, and share quality data.{' '}
            <Anchor href="#">Learn more</Anchor> about data types, creating, and
            collaborating.
          </Paragraph>
        </Box>
      </Header>
    </PageContent>
  </Page>
);
