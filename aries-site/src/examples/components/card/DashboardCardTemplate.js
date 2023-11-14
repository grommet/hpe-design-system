import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Notification,
  Text,
  ThemeContext,
} from 'grommet';
import PropTypes from 'prop-types';
import { LinkNext } from 'grommet-icons';
import { useContext } from 'react';

export const DashboardCardTemplate = ({
  buttonProps,
  children,
  level,
  title,
  subtitle,
  notification,
  ...rest
}) => {
  const { heading } = useContext(ThemeContext);

  const cardHeadingStyle = {
    1: heading.level[2],
    2: heading.level[2],
    3: heading.level[2],
    4: heading.level[2],
    5: heading.level[2],
    6: heading.level[2],
  };

  // WHAT WE HAVE NOW
  // title: string | JSX
  // level?: number | have default 3 in case they pass string without level
  // subtitle?: string
  // action:{ href: string, ButtonProps }
  // children?: JSX
  // notification?: {status: string, message: string}

  return (
    <Card {...rest}>
      <CardHeader>
        <Box>
          {typeof title === 'string' ? (
            <ThemeContext.Extend
              value={{ heading: { level: cardHeadingStyle } }}
            >
              <Heading level={level || 3} margin="none">
                {title}
              </Heading>
            </ThemeContext.Extend>
          ) : (
            { title }
          )}
          {subtitle && <Text>{subtitle}</Text>}
        </Box>
        <Button
          a11yTitle=""
          alignSelf="start"
          icon={<LinkNext a11yTitle={`Go to ${title}`} color="brand" />}
          {...buttonProps}
        />
      </CardHeader>
      <CardBody flex pad={{ horizontal: 'medium', bottom: 'medium' }}>
        {children}
      </CardBody>
      {notification && (
        <CardFooter pad={{ horizontal: 'medium', bottom: 'medium' }}>
          <Notification
            status={notification?.status}
            message={notification?.message}
            actions={notification?.actions}
            fill
          />
        </CardFooter>
      )}
    </Card>
  );
};

DashboardCardTemplate.propTypes = {
  buttonProps: PropTypes.object,
  children: PropTypes.node,
  level: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  subtitle: PropTypes.string,
  notification: PropTypes.object,
};
