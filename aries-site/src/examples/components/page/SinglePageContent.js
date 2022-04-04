import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Card,
  Grid,
  Header,
  Heading,
  Page,
  PageContent,
  Paragraph,
  Text,
  TextInput,
} from 'grommet';

import { PageHeader } from '../../templates';

import trainingDataSets from '../../../data/mockData/trainingDataSets.json';
// `demoStyle` is specific for the Design System site and is used
// as a visual aid to help present layout concepts. Remove from
// your implementation.
const demoStyle = { border: { style: 'dashed' } };

export const SinglePageContent = () => (
  <Page background="background-back" flex="grow" {...demoStyle}>
    <PageContent gap="large" {...demoStyle}>
      <PageHeader
        title="Explore Datasets"
        subtitle={`Explore datasets from a variety sources without reliance
        on IT or governance and compliance.`}
        {...demoStyle}
      />
      <Box {...demoStyle}>
        <Paragraph>
          Explore, analyze, and share quality data. Learn more about data types,
          creating, and collaborating.
        </Paragraph>
      </Box>
      <TextInput placeholder="placeholder" />
      {trainingDataSets &&
        Object.entries(trainingDataSets).map(([key, value]) => (
          <DataSetPreview key={key} set={value} />
        ))}
    </PageContent>
  </Page>
);

const DataSetPreview = ({ set }) => (
  <Box {...demoStyle}>
    <Header>
      <Heading level={2} size="small">
        {set.title}
      </Heading>
      <Text>
        <Anchor href="#" label="See All" />
      </Text>
    </Header>
    <Grid columns={{ count: 'fill', size: 'small' }} rows="small" gap="small">
      {set && set.sources.slice(0, 7).map((_, index) => <Card key={index} />)}
    </Grid>
  </Box>
);

DataSetPreview.propTypes = {
  set: PropTypes.shape({
    title: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.object),
  }),
};
