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
import { LinkNext, ShareRounded } from 'grommet-icons';

export const DashboardCard = ({
  icon,
  external,
  level,
  title,
  subtitle,
  children,
  footer,
  inline,
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
  const inlineProps = inline
    ? {
        background: undefined,
        pad: 'none',
        elevation: 'none',
        round: 'none',
      }
    : {};

  return (
    <Card {...inlineProps} {...rest}>
      <CardHeader align="start" {...inlineProps}>
        <Box direction="row" gap="small" align="start">
          {icon && <Box flex={false}>{icon}</Box>}
          <Box gap="xsmall" flex={false}>
            <Heading level={level} margin="none">
              {title}
            </Heading>
            <Text size="small">{subtitle}</Text>
          </Box>
        </Box>
        <Box flex={false}>
          {external ? (
            <ShareRounded a11yTitle={`Go to ${title}`} color="brand" />
          ) : (
            <LinkNext a11yTitle={`Go to ${title}`} color="brand" />
          )}
        </Box>
      </CardHeader>
      {children && (
        <CardBody
          pad={{ horizontal: 'medium', bottom: !footer ? 'medium' : undefined }}
          {...inlineProps}
        >
          {children}
        </CardBody>
      )}
      {footer && (
        <CardFooter
          pad={{ horizontal: 'medium', bottom: 'medium' }}
          {...inlineProps}
        >
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

DashboardCard.propTypes = {
  icon: PropTypes.element,
  external: PropTypes.bool,
  level: PropTypes.number,
  title: PropTypes.string,
  inline: PropTypes.bool,
  subtitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  footer: PropTypes.element,
};
