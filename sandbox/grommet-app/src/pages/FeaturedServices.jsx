import { Fragment } from 'react';
import { Anchor, Box, Heading, Grid, Tabs, Tab } from 'grommet';
import PropTypes from 'prop-types';
import services from '../mockData/services.json';
import { Card } from '../components';
import { LinkNext } from 'grommet-icons';

const TabContent = ({ data, ...rest }) => (
  <Grid columns="small" gap="medium" pad={{ vertical: 'medium' }} {...rest}>
    {data.map((service, index) => (
      <Card
        key={index}
        title={service.name}
        subtitle={service.category}
        description={service.description || 'hi'}
        actions={<LinkNext color="brand" />}
        level={3}
      />
    ))}
  </Grid>
);

TabContent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export const FeaturedServices = () => {
  let categories = services.services.map(service => service.category);
  categories = [...new Set(categories)].sort();

  const Container = Fragment;
  const containerProps = {};
  // const Container = Box;
  // const containerProps = {
  //   background: 'background-front',
  //   pad: 'medium',
  //   round: 'medium',
  // };

  return (
    <Container {...containerProps}>
      <Box gap="medium">
        <Box direction="row" gap="medium" justify="between">
          <Heading level={2} margin="none">
            Featured services
          </Heading>
          <Anchor href="#" label="View catalog" />
        </Box>
        <Tabs justify="start">
          <Tab title="Recommended">
            <TabContent data={services.services.slice(0, 8)} />
          </Tab>
          {categories.map(category => {
            const filteredServices = services.services.filter(
              service => service.category === category,
            );

            return (
              <Tab
                key={category}
                title={`${category} (${filteredServices.length})`}
              >
                <TabContent data={filteredServices} />
              </Tab>
            );
          })}
        </Tabs>
      </Box>
    </Container>
  );
};
