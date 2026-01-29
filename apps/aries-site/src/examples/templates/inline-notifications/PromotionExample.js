import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Page,
  PageContent,
  PageHeader,
  Image,
  Grid,
  Notification,
} from 'grommet';

import { Card } from '../Card';
import services from '../../../data/mockData/services.json';

export const PromotionExample = () => (
  <Page>
    <PageContent flex={false}>
      <PageHeader title="Services" />
      <Box gap="medium" pad={{ bottom: 'xlarge' }}>
        <Grid columns="medium" gap="medium">
          {services.map((service, index) => (
            <ServiceCard service={service} key={index} upgrade={index === 1} />
          ))}
        </Grid>
      </Box>
    </PageContent>
  </Page>
);

const ServiceCard = ({ service, upgrade }) => {
  return (
    <Card
      notification={
        upgrade ? (
          <Notification
            message="Versions 12.0.3 is available."
            actions={[{ label: 'Upgrade' }]}
            status="info"
          />
        ) : null
      }
      title={service.title}
      description={service.description}
      icon={
        <Box height="5xsmall" alignSelf="start" flex={false}>
          <Image
            src={service.src}
            alt={`${service.title} logo`}
            fit="contain"
          />
        </Box>
      }
      actions={
        <Button
          label="Launch"
          secondary
          a11yTitle={`Launch ${service.title}`}
        />
      }
      level={2}
    />
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    src: PropTypes.string,
  }),
  upgrade: PropTypes.bool,
};
