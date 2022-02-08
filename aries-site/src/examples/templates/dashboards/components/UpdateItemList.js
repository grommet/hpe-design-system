import PropTypes from 'prop-types';
import { Anchor, Box, Text } from 'grommet';

export const UpdateItemList = ({ title, description }) => (
  <Box>
    <Text weight="bold">{`${title} is available.`}</Text>
    <Box gap="xsmall">
      <Text>{description}</Text>
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
  </Box>
);
UpdateItemList.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
