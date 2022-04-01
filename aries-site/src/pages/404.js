import React, { useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from 'styled-components';
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Page,
  PageContent,
  Paragraph,
  ResponsiveContext,
} from 'grommet';
import { Layout } from '../layouts';
import { Meta } from '../components';

const title = 'Page Not Found';

const Visual = () => {
  const theme = useContext(ThemeContext);

  return (
    <Box>
      <Image
        src={theme.dark ? '/404-pile-invert.svg' : '/404-pile.svg'}
        fit="contain"
      />
    </Box>
  );
};

const Message = () => (
  <Box align="start" gap="small">
    <Heading margin="none">Oops, there’s nothing here.</Heading>
    <Paragraph margin="none" size="large">
      The page you’re looking for could not be found.
    </Paragraph>
    <Paragraph margin={{ bottom: 'medium', top: 'none' }} size="large">
      Error Type: 404.
    </Paragraph>
    <Link href="/" passHref>
      <Button label="Back to Home" primary />
    </Link>
  </Box>
);

const Custom404 = () => {
  const size = useContext(ResponsiveContext);

  const first = !['xsmall', 'small'].includes(size) ? <Message /> : <Visual />;
  const second = !['xsmall', 'small'].includes(size) ? <Visual /> : <Message />;

  return (
    <Layout title={title} isLanding>
      <Meta title={title} />
      <PageContent>
        <Grid
          columns={
            !['xsmall', 'small'].includes(size) ? ['medium', 'auto'] : '100%'
          }
          gap="large"
          pad={{ top: 'large' }}
          fill
        >
          {first}
          {second}
        </Grid>
      </PageContent>
    </Layout>
  );
};

export default Custom404;
