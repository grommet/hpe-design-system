import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Paragraph,
  Text,
} from 'grommet';

// avoid duplication of padding between Card header, body, and footer
const adjustPad = (direction, context, theme) => {
  const pad = theme?.card?.body?.pad;

  let adjustedPad;
  if (context === 'header') {
    adjustedPad = {
      left: pad,
      right: pad,
      bottom: 'xsmall',
      top: pad,
    };
  }
  if (context === 'body') {
    adjustedPad = {
      left: pad,
      right: pad,
      top: undefined,
      bottom: pad,
    };
  } else if (context === 'footer') {
    adjustedPad = {
      left: direction !== 'row' ? pad : undefined,
      right: pad,
      bottom: pad,
      top: direction !== 'row' ? undefined : pad,
    };
  }
  return adjustedPad;
};

const DesignSystemCard = ({
  as,
  actions,
  avatar,
  children,
  description,
  direction,
  icon,
  level,
  media,
  notification,
  subtitle,
  pretitle,
  title,
  ...rest
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Box as={as}>
      <Card direction={direction} as="section" fill="vertical" {...rest}>
        {media}
        <Box flex>
          <CardHeader
            direction="column"
            gap="none"
            align="start"
            // pad={adjustPad(direction, 'header', theme)}
            pad={{ top: 'medium', horizontal: 'medium' }}
          >
            {avatar && (
              <Avatar
                flex={false}
                pad={{ bottom: 'small' }}
                a11yTitle={`${title} icon`}
                round="medium"
                src={avatar}
              />
            )}
            {icon && <Box pad={{ bottom: 'small' }}>{icon}</Box>}
            {pretitle && <Text size="small">{pretitle}</Text>}
            {title && typeof title === 'string' ? (
              <Heading level={level} margin="none">
                {title}
              </Heading>
            ) : (
              title
            )}
            {subtitle && (
              <Box pad={{ bottom: 'xsmall' }}>
                <Text size="small">{subtitle}</Text>
              </Box>
            )}
          </CardHeader>
          <CardBody
            align="start"
            pad={{ bottom: 'medium', horizontal: 'medium' }}
          >
            <Paragraph margin="none" maxLines={4}>
              {description}
            </Paragraph>
            {children}
          </CardBody>
        </Box>
        {actions ? (
          <CardFooter
            align="stretch"
            direction="column"
            gap="small"
            pad={adjustPad(direction, 'footer', theme)}
          >
            {notification}
            <Box flex={false} align="start">
              {actions}
            </Box>
          </CardFooter>
        ) : null}
      </Card>
    </Box>
  );
};

DesignSystemCard.propTypes = {
  actions: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  as: PropTypes.string,
  alignActions: PropTypes.oneOf(['end']),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  description: PropTypes.string,
  direction: PropTypes.oneOf(['column', 'row']),
  avatar: PropTypes.element,
  icon: PropTypes.element,
  level: PropTypes.number,
  media: PropTypes.element,
  notification: PropTypes.element,
  title: PropTypes.string,
  pretitle: PropTypes.string,
  subtitle: PropTypes.string,
};

export { DesignSystemCard as Card };