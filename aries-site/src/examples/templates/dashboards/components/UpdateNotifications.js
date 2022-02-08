import PropTypes from 'prop-types';
import { Box, List } from 'grommet';
import { UpdateItemList } from './UpdateItemList';

export const UpdateNotifications = ({
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
        <UpdateItemList
          title={datum.displayName}
          description={datum.description}
        />
      )}
    </List>
  </Box>
);

UpdateNotifications.propTypes = {
  defaultItemProps: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object),
  itemProps: PropTypes.object,
};
