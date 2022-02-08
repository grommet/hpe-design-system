import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, ThemeContext } from 'grommet';
import { useContext } from 'react';
import { DashboardCardHeader } from '.';

export const UpdatesFeed = ({ background, children, title }) => {
  const theme = useContext(ThemeContext);
  const { body, header } = theme.card;

  return (
    <Card background={background || 'background'}>
      <CardHeader
        pad={{ horizontal: header.pad, top: header.pad, bottom: 'none' }}
      >
        <DashboardCardHeader
          menuItems={menuItems}
          title={title}
        />
      </CardHeader>
      <CardBody
        gap="medium"
        pad={{ horizontal: body.pad, top: 'none', bottom: 'medium' }}
      >
        {children}
      </CardBody>
    </Card>
  );
};

UpdatesFeed.propTypes = {
  background: PropTypes.string,
  children: PropTypes.object,
  title: PropTypes.string,
};
