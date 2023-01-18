import React, { useContext } from 'react';
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
import { adjustPad } from './utils';

const DesignSystemCard = ({
  as,
  actions,
  alignActions,
  avatar,
  children,
  description,
  direction,
  icon,
  level,
  media,
  subtitle,
  pretitle,
  title,
  ...rest
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Box as={as}>
      <Card direction={direction} as="section" {...rest}>
        {media}
        <Box>
          <CardHeader
            direction="column"
            gap="none"
            align="start"
            pad={adjustPad(direction, 'header', theme)}
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
              <Heading level={level} margin="none" size="small">
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
            align='start'
            pad={adjustPad(direction, 'body', theme)}
          >
            <Paragraph margin="none">{description}</Paragraph>
          </CardBody>
        </Box>
        <CardFooter
          align={alignActions || 'start'}
          pad={adjustPad(direction, 'footer', theme)}
        >
          <Box flex={false}>{actions}</Box>
        </CardFooter>
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
  children: PropTypes.oneOf([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  description: PropTypes.string,
  direction: PropTypes.oneOf(['column', 'row']),
  avatar: PropTypes.element,
  icon: PropTypes.element,
  level: PropTypes.number,
  media: PropTypes.element,
  title: PropTypes.string,
  pretitle: PropTypes.string,
  subtitle: PropTypes.string,
};

export { DesignSystemCard as Card };
