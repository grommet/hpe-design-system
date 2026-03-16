import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  ThemeContext,
} from 'grommet';
import { useContext } from 'react';

export const ActivityFeed = ({ children, title, footer: footerContent }) => {
  const theme = useContext(ThemeContext);
  const { body, footer, header } = theme.card;

  return (
    <Card>
      <CardHeader
        pad={{ horizontal: header.pad, top: header.pad, bottom: 'xsmall' }}
      >
        <Heading margin="none" level={2}>
          {title}
        </Heading>
      </CardHeader>
      <CardBody gap="medium" pad={{ horizontal: body.pad, vertical: 'none' }}>
        {children}
      </CardBody>
      <CardFooter justify="end" pad={{ ...footer.pad, vertical: 'medium' }}>
        {footerContent}
      </CardFooter>
    </Card>
  );
};

ActivityFeed.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footer: PropTypes.node,
};
