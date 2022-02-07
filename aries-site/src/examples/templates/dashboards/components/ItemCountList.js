import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  List,
  Paragraph,
  Text,
  ThemeContext,
} from 'grommet';
import { DashboardCardHeader } from '.';

export const ItemCountList = ({
  defaultItemProps,
  items,
  menuItems,
  title,
}) => {
  const theme = useContext(ThemeContext);
  const { body, header } = theme.card;

  return (
    <Card>
      <CardHeader
        pad={{ horizontal: header.pad, top: header.pad, bottom: 'none' }}
      >
        <DashboardCardHeader title={title} menuItems={menuItems} />
      </CardHeader>
      <CardBody pad={{ horizontal: body.pad, vertical: 'small' }}>
        <List data={items} defaultItemProps={defaultItemProps}>
          {datum => (
            <ItemCount
              title={datum.title}
              description={datum.description}
              count={datum.count}
            />
          )}
        </List>
      </CardBody>
    </Card>
  );
};

const ItemCount = ({ title, description, count, ...rest }) => (
  <Box direction="row" justify="between" {...rest}>
    <Box>
      <Text weight="bold">{title}</Text>
      <Paragraph size="small" margin="none">
        {description}
      </Paragraph>
    </Box>
    <Text size="xlarge">{count}</Text>
  </Box>
);

ItemCount.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  count: PropTypes.number,
};

ItemCountList.propTypes = {
  defaultItemProps: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object),
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      onClick: PropTypes.func,
    }),
  ),
  title: PropTypes.string,
};
