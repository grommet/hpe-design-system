import PropTypes from 'prop-types';
import { List } from 'grommet';
import { UpdateItem } from './UpdateItem';

export const UpdateNotificationsList = ({
  defaultItemProps,
  items,
  itemProps,
}) => (
  <List data={items} itemProps={itemProps} defaultItemProps={defaultItemProps}>
    {datum => (
      <UpdateItem title={datum.displayName} description={datum.description} />
    )}
  </List>
);

UpdateNotificationsList.propTypes = {
  defaultItemProps: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object),
  itemProps: PropTypes.object,
};
