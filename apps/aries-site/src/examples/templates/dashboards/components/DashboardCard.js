import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, Heading, Text } from 'grommet';

export const DashboardCard = ({ card, ...rest }) => {
  const { background, cta, description, descriptionColor, icon, title } = card;
  return (
    <Card background={background || 'background'} fill {...rest}>
      <CardBody gap="xsmall" align="start" flex="grow">
        {icon}
        <Heading margin="none" level={2}>
          {title}
        </Heading>
        <Text color={descriptionColor}>{description}</Text>
        {typeof cta === 'string' ? <Button label={cta} secondary /> : cta}
      </CardBody>
    </Card>
  );
};

DashboardCard.propTypes = {
  card: PropTypes.shape({
    background: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    cta: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    description: PropTypes.string,
    descriptionColor: PropTypes.string,
    icon: PropTypes.element,
    title: PropTypes.string,
  }).isRequired,
};
