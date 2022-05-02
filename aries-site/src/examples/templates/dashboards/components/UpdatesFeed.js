import PropTypes from 'prop-types';
import { Box, Card, CardBody, CardHeader, ThemeContext } from 'grommet';
import { useContext } from 'react';
import { DashboardCardHeader } from '.';

export function UpdatesFeed({ background, children, menuItems, title }) {
  const theme = useContext(ThemeContext);
  const { body, header } = theme.card;

  return (
    <Card>
      <Box background={background} fill>
        <CardHeader
          pad={{ horizontal: header.pad, top: header.pad, bottom: 'none' }}
        >
          <DashboardCardHeader menuItems={menuItems} title={title} />
        </CardHeader>
        <CardBody
          gap="medium"
          pad={{ horizontal: body.pad, top: 'none', bottom: 'medium' }}
        >
          {children}
        </CardBody>
      </Box>
    </Card>
  );
}

UpdatesFeed.propTypes = {
  background: PropTypes.string,
  children: PropTypes.object,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      onClick: PropTypes.func,
    }),
  ),
  title: PropTypes.string,
};
