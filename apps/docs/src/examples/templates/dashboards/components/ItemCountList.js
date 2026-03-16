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
import { TextEmphasis } from '@shared/aries-core';
import { DashboardCardHeader } from '.';

export const ItemCountList = ({
  defaultItemProps,
  items,
  menuItems,
  title,
  ...rest
}) => {
  const theme = useContext(ThemeContext);
  const { body, header } = theme.card;

  return (
    <Card {...rest}>
      <CardHeader
        pad={{ horizontal: header.pad, top: header.pad, bottom: 'none' }}
      >
        <DashboardCardHeader title={title} level={3} menuItems={menuItems} />
      </CardHeader>
      <CardBody pad={{ horizontal: body.pad, vertical: 'xsmall' }}>
        <Box width={{ max: 'medium' }}>
          <List data={items} defaultItemProps={defaultItemProps}>
            {datum => (
              <ItemCount
                title={datum.title}
                description={datum.description}
                count={datum.count}
              />
            )}
          </List>
        </Box>
      </CardBody>
    </Card>
  );
};

const ItemCount = ({ title, description, count, ...rest }) => (
  <Box direction="row" justify="between" gap="medium" {...rest}>
    <Box>
      <TextEmphasis>{title}</TextEmphasis>
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
