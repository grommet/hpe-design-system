import PropTypes from 'prop-types';
import {
  Anchor,
  Card,
  Grid,
  Header,
  Heading,
  Page,
  PageContent,
  Paragraph,
  Text,
} from 'grommet';

import {
  FilterControls,
  FiltersProvider,
  useFilters,
  PageHeader,
} from '../../templates';
import trainingDataSets from '../../../data/mockData/trainingDataSets.json';
// `demoStyle` is specific for the Design System site and is used
// as a visual aid to help present layout concepts. Remove from
// your implementation.
import { demoStyle } from './demoStyle';

const defaultCategories = {
  Trending: { title: 'Trending', sources: [] },
  Classification: { title: 'Classification', sources: [] },
  Population: { title: 'Population', sources: [] },
  Economics: { title: 'Economics', sources: [] },
};

export const SinglePageContent = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.

  // Group data by categories.
  const categories = trainingDataSets.reduce((acc, cur) => {
    cur.categories.forEach(category => {
      if (acc[category] && !acc[category].sources.includes(cur))
        acc[category].sources.push(cur);
    });
    return acc;
  }, defaultCategories);

  // FilterControls prop values
  const filterControls = {
    filtersConfig: [
      { property: 'title', label: 'Data Source', filterType: 'CheckBoxGroup' },
    ],
    layerProps: {
      // containerRef is for demonstration purposes on this site. Most
      // implementations should likely remove.
      target: containerRef && containerRef.current,
    },
    searchFilter: {
      placeholder: 'Search datasets...',
    },
  };

  return (
    <Page
      background="background-back"
      flex="grow"
      pad={{ vertical: 'large' }}
      {...demoStyle}
    >
      <PageContent gap="large" {...demoStyle}>
        <PageHeader
          title="Explore Datasets"
          subtitle={`Explore datasets from a variety of sources without reliance
          on IT or governance and compliance.`}
        />
        <Paragraph margin="none">
          Discover, analyze, and share quality data. Learn more about data
          types, creating, and collaborating.
        </Paragraph>
        <FiltersProvider>
          <FilterControls data={trainingDataSets} {...filterControls} />
          <Datasets data={trainingDataSets} categories={categories} />
        </FiltersProvider>
      </PageContent>
    </Page>
  );
};

SinglePageContent.propTypes = {
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const Datasets = ({ data, categories }) => {
  const { filteredResults } = useFilters();

  return filteredResults.length !== data.length ? (
    <Grid columns={{ count: 'fill', size: 'small' }} rows="small" gap="small">
      {filteredResults &&
        filteredResults.map(source => <Card key={source.id} />)}
    </Grid>
  ) : (
    categories &&
      Object.entries(categories).map(([key, value]) => (
        <Category key={key} category={value} />
      ))
  );
};

Datasets.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.object,
};

const Category = ({ category }) => (
  <>
    <Header>
      <Heading level={2} size="small">
        {category.title}
      </Heading>
      <Text>
        <Anchor href="#" label="See All" />
      </Text>
    </Header>
    <Grid columns={{ count: 'fill', size: 'small' }} rows="small" gap="small">
      {category &&
        category.sources.slice(0, 7).map(source => <Card key={source.id} />)}
    </Grid>
  </>
);

Category.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.object),
  }),
};
