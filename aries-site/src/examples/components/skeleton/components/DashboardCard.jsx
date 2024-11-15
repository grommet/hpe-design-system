import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Skeleton,
  Text,
} from 'grommet';
import { LinkNext } from 'grommet-icons';
import { SkeletonContext } from '../contexts';

export const DashboardCard = ({
  children,
  footer,
  level,
  subtitle,
  title,
  ...rest
}) => {
  const skeleton = useContext(SkeletonContext);
  const skeletonProps = skeleton
    ? {
        elevation: 'none',
        skeleton: skeleton || undefined,
      }
    : {};
  const animation = !skeleton ? 'fadeIn' : undefined;

  return (
    <Card animation={animation} {...skeletonProps} {...rest}>
      <CardHeader align="start">
        <HeaderContent
          level={level}
          skeleton={skeleton}
          subtitle={subtitle}
          title={title}
        />
      </CardHeader>
      <CardBody
        pad={{ horizontal: 'medium', bottom: footer ? undefined : 'medium' }}
      >
        {children}
      </CardBody>
      {footer && (
        <CardFooter pad={{ horizontal: 'medium', vertical: 'medium' }}>
          {skeleton ? <Skeleton height="xxsmall" /> : footer}
        </CardFooter>
      )}
    </Card>
  );
};

DashboardCard.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.node,
  level: PropTypes.number.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

const HeaderContent = ({ icon, level, skeleton, subtitle, title, ...rest }) => {
  return (
    <Box direction="row" align="start" gap="small" {...rest}>
      {icon && (
        <Box flex={false}>
          {skeleton ? <Skeleton height="xxsmall" width="xxsmall" /> : icon}
        </Box>
      )}
      <Box flex={false} gap="xsmall">
        <Heading level={level} margin="none">
          {title}
        </Heading>
        <Text size="small">{subtitle}</Text>
      </Box>
      <Box flex={false}>
        {skeleton ? (
          <Skeleton pad="small" />
        ) : (
          <LinkNext a11yTitle={`Go to ${title}`} color="brand" />
        )}
      </Box>
    </Box>
  );
};

HeaderContent.propTypes = {
  icon: PropTypes.node,
  level: PropTypes.number.isRequired,
  skeleton: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};
