import React from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Cards,
  Card as GrommetCard,
  CardBody,
  Text,
  Heading,
} from 'grommet';
import { StatusCriticalSmall, StatusGoodSmall } from 'grommet-icons';

export const CardView = () => {
  return (
    <Cards size="medium" margin={{ bottom: 'medium' }}>
      {datum => (
        <Card
          name={datum.name}
          success={datum.success}
          rocket={datum.rocket}
          date={datum.date_utc}
          src={datum.links?.patch?.small}
        />
      )}
    </Cards>
  );
};

const Card = ({ name, success, rocket }) => {
  return (
    <GrommetCard elevation="medium">
      <CardBody gap="medium">
        <Box gap="xsmall">
          <Box direction="row" align="center" gap="xsmall" flex>
            {success === 'Successful' ? (
              <StatusGoodSmall color="status-ok" height="medium" />
            ) : (
              <StatusCriticalSmall color="status-critical" height="medium" />
            )}
            <Text>{success}</Text>
          </Box>
          <Heading level={2} margin="none">
            {name}
          </Heading>
          <Text>{rocket}</Text>
        </Box>
        <Anchor label="View details" />
      </CardBody>
    </GrommetCard>
  );
};

Card.propTypes = {
  name: PropTypes.string,
  success: PropTypes.string,
  rocket: PropTypes.string,
};
