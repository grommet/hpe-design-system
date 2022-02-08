import PropTypes from 'prop-types';
import { Anchor, Box, List, Text } from 'grommet';

export const NotificationItem = ({ defaultItemProps, items, itemProps }) => (
  <Box>
    <List
      data={items}
      itemProps={itemProps}
      defaultItemProps={defaultItemProps}
    >
      {datum => (
        <ItemList title={datum.displayName} description={datum.description} />
      )}
    </List>
  </Box>
);

const ItemList = ({ title, description }) => (
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

NotificationItem.propTypes = {
  defaultItemProps: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object),
  itemProps: PropTypes.object,
};

ItemList.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
