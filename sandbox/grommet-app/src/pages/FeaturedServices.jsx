import { Anchor, Grid, Tabs, Tab } from 'grommet';
import PropTypes from 'prop-types';
import services from '../mockData/services.json';
import { Card } from '../components';
import { LinkNext } from 'grommet-icons';
import ContentPane from '../components/ContentPane';

const TabContent = ({ data, ...rest }) => (
  <Grid columns="small" gap="medium" pad={{ vertical: 'medium' }} {...rest}>
    {data.map((service, index) => (
      <Card
        key={index}
        title={service.name}
        subtitle={service.category}
        description={service.description || 'hi'}
        actions={<LinkNext color="primary" />}
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

  return (
    <ContentPane
      heading="Featured services"
      level={2}
      actions={<Anchor href="#" label="View catalog" />}
    >
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
    </ContentPane>
  );
};
