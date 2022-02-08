import PropTypes from 'prop-types';
import { Box, List } from 'grommet';
import { UpdateItem } from './UpdateItem';

export const UpdateNotificationsList = ({
  defaultItemProps,
  items,
  itemProps,
}) => (
  <Box>
    <List
      data={items}
      itemProps={itemProps}
      defaultItemProps={defaultItemProps}
    >
      {datum => (
        <UpdateItem title={datum.displayName} description={datum.description} />
      )}
    </List>
  </Box>
);

UpdateNotificationsList.propTypes = {
  defaultItemProps: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object),
  itemProps: PropTypes.object,
};
