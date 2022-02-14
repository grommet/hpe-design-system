import PropTypes from 'prop-types';
import { Anchor, Box, Grid, Text } from 'grommet';

export const Activity = ({
  icon,
  title,
  message,
  timestamp: timestampProp,
}) => {
  const timestamp = new Date(timestampProp);

  return (
    <Grid columns={['auto', 'flex']} rows={['auto', 'auto']}>
      <Box justify="center" pad={{ right: 'xsmall' }}>
        {icon}
      </Box>
      <Text weight="bold">{title}</Text>
      <Box />
      <Box>
        <Text>
          {message} {timestamp.toLocaleDateString()}{' '}
          {timestamp.toLocaleTimeString()}
        </Text>
        <Anchor
          href="#"
          a11yTitle={`This anchor is for visual demonstration purposes. 
          The link will not navigate to a new page.`}
          label="View Details"
          size="small"
          onClick={() => {
            // eslint-disable-next-line no-alert
            alert(`
Typically this would route to a view displaying the detail 
behind the selected activities.
              `);
          }}
        />
      </Box>
    </Grid>
  );
};

Activity.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  message: PropTypes.string,
  timestamp: PropTypes.string,
};
