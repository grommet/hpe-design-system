import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, List, Text } from 'grommet';
import { More, StatusCriticalSmall, StatusGoodSmall } from 'grommet-icons';

export const ListView = () => {
  return (
    <List>
      {datum => (
        <ListItem
          key={datum.name}
          name={datum.name}
          success={datum.success}
          rocket={datum.rocket}
          date={datum.date_utc}
          src={datum.links?.patch?.small}
        />
      )}
    </List>
  );
};

const ListItem = ({ name, success, rocket, date }) => {
  return (
    <Box direction="row" gap="medium" align="start">
      <Box gap="3xsmall" flex>
        <Box direction="row" gap="xsmall">
          <Text color="text-strong" weight={500}>
            {name}
          </Text>
          <Box direction="row" align="center" gap="3xsmall" flex>
            {success === 'Successful' ? (
              <StatusGoodSmall color="status-ok" height="medium" />
            ) : (
              <StatusCriticalSmall color="status-critical" height="medium" />
            )}
            <Text>{success}</Text>
          </Box>
        </Box>
        <Text>{rocket}</Text>
      </Box>
      <Box direction="row" gap="xsmall" justify="end" align="center">
        {date ? (
          <Text>
            {Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
              new Date(date),
            )}
          </Text>
        ) : undefined}
        <Button a11yTitle="Actions" icon={<More />} />
      </Box>
    </Box>
  );
};

ListItem.propTypes = {
  date: PropTypes.string,
  name: PropTypes.string,
  success: PropTypes.string,
  rocket: PropTypes.string,
};
