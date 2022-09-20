import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardBody, Heading, Paragraph, Text } from 'grommet';

const DesignSystemCard = ({
  actions,
  alignActions,
  children,
  description,
  direction,
  icon,
  level,
  subtitle,
  pretitle,
  title,
  ...rest
}) => (
  <Card {...rest}>
    <CardBody
      direction={direction}
      align="start"
      gap="medium"
      justify={alignActions === 'end' ? 'between' : 'start'}
    >
      <Box gap="xsmall">
        <>
          {icon && <Box pad={{ bottom: 'small' }}>{icon}</Box>}
          {pretitle && <Text size="small">{pretitle}</Text>}
          {title && (
            <Heading level={level} margin="none" size="small">
              {title}
            </Heading>
          )}
          {subtitle && (
            <Box pad={{ bottom: 'xsmall' }}>
              <Text size="small">{subtitle}</Text>
            </Box>
          )}
        </>
        <Paragraph margin="none">{description}</Paragraph>
      </Box>
      {actions}
    </CardBody>
  </Card>
);

DesignSystemCard.propTypes = {
  actions: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  alignActions: PropTypes.oneOf(['end']),
  children: PropTypes.oneOf([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  description: PropTypes.string,
  direction: PropTypes.oneOf(['column', 'row']),
  icon: PropTypes.element,
  level: PropTypes.number,
  title: PropTypes.string,
  pretitle: PropTypes.string,
  subtitle: PropTypes.string,
};

export { DesignSystemCard as Card };
