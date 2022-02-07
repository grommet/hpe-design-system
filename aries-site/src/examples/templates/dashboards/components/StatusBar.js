import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, NameValueList } from 'grommet';
import { DashboardCardHeader } from '.';

export const StatusBar = ({ children, title, menuItems, ...rest }) => (
  <Card {...rest}>
    <CardHeader>
      <DashboardCardHeader title={title} menuItems={menuItems} />
    </CardHeader>
    <CardBody>
      <NameValueList
        valueProps={{ width: 'xsmall' }}
        pairProps={{ direction: 'column' }}
        layout="grid"
      >
        {children}
      </NameValueList>
    </CardBody>
  </Card>
);

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
