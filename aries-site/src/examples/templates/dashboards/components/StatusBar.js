import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  ThemeContext,
} from 'grommet';
import { DashboardCardHeader } from '.';

export const StatusBar = ({ children, title, menuItems, ...rest }) => {
  const theme = useContext(ThemeContext);
  const { header } = theme.card;

  return (
    <Card {...rest}>
      <CardHeader
        pad={{ horizontal: header.pad, top: header.pad, bottom: 'small' }}
      >
        <DashboardCardHeader title={title} level={3} menuItems={menuItems} />
      </CardHeader>
      <CardBody>
        <Grid
          align={undefined}
          columns={{ count: 'fit', size: ['xsmall', 'auto'] }}
          gap={{ column: 'large', row: 'medium' }}
          margin="none"
        >
          {children}
        </Grid>
      </CardBody>
    </Card>
  );
};

StatusBar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      onClick: PropTypes.func,
    }),
  ),
};
