import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Paragraph } from 'grommet';

import { CardGrid, Meta } from '../components';
import { Layout, PageIntro } from '../layouts';
import { getCards, getPageDetails, titleCase } from '../utils';

const NavPage = ({ topic: topicProp }) => {
  const topic = titleCase(topicProp);
  const pageDetails = getPageDetails(topic);
  const cards = getCards(topic);
  React.useEffect(() => console.log(pageDetails), [pageDetails]);
  return (
    <Layout
      title={topic}
      isLanding
      backgroundImage={pageDetails.backgroundImage}
    >
      <Meta
        title={topic}
        description={pageDetails.seoDescription}
        canonicalUrl={`https://design-system.hpe.design/${topicProp}`}
      />
      <Box gap="large">
        <PageIntro>
          <Box justify="center" fill>
            <Heading margin="none">{topic}</Heading>
            <Paragraph fill>{pageDetails.description}</Paragraph>
          </Box>
        </PageIntro>
        <CardGrid cards={cards} />
      </Box>
    </Layout>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  const { pages } = getPageDetails('Home');
  // Get the paths we want to pre-render based on topics
  // in structure for Home
  const paths = pages.map(page => `/${page.toLowerCase()}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // From the static paths, it pulls the topic out
  // since we've defined the param structure of /[topic]
  const { topic } = params;
  return { props: { topic } };
}

NavPage.propTypes = {
  topic: PropTypes.string.isRequired,
};

export default NavPage;
