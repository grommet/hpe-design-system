import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardHeader,
  NameValueList,
  ThemeContext,
} from 'grommet';
import { DashboardCardHeader } from '.';

export function StatusBar({ children, title, menuItems, ...rest }) {
  const theme = useContext(ThemeContext);
  const { header } = theme.card;

  return (
    <Card {...rest}>
      <CardHeader
        pad={{ horizontal: header.pad, top: header.pad, bottom: 'small' }}
      >
        <DashboardCardHeader title={title} menuItems={menuItems} />
      </CardHeader>
      <CardBody>
        <NameValueList
          valueProps={{ width: ['xsmall', 'auto'] }}
          pairProps={{ direction: 'column' }}
          layout="grid"
        >
          {children}
        </NameValueList>
      </CardBody>
    </Card>
  );
}

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
