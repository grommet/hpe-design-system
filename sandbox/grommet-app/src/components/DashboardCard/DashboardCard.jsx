// import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  //   ThemeContext,
  Text,
} from 'grommet';
import { LinkNext } from 'grommet-icons';

export const DashboardCard = ({
  icon,
  level,
  title,
  subtitle,
  children,
  footer,
  ...rest
}) => {
  //   const { heading } = useContext(ThemeContext);

  //   const cardHeadingStyle = {
  //     1: heading.level[2],
  //     2: heading.level[2],
  //     3: heading.level[2],
  //     4: heading.level[2],
  //     5: heading.level[2],
  //     6: heading.level[2],
  //   };
  return (
    <Card {...rest}>
      <CardHeader align="start">
        <Box direction="row" gap="small" align="start">
          <Box flex={false}>{icon}</Box>
          <Box gap="xsmall" flex={false}>
            <Heading level={level} margin="none">
              {title}
            </Heading>
            <Text size="small">{subtitle}</Text>
          </Box>
        </Box>
        <Box flex={false}>
          <LinkNext a11yTitle={`Go to ${title}`} color="brand" />
        </Box>
      </CardHeader>
      {children && (
        <CardBody pad={{ horizontal: 'medium' }}>{children}</CardBody>
      )}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

DashboardCard.propTypes = {
  icon: PropTypes.element,
  level: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  footer: PropTypes.element,
};
