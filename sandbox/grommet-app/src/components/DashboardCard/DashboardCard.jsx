// import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
  Text,
} from 'grommet';
import { LinkNext, ShareRounded } from 'grommet-icons';
import { useContext } from 'react';
import { SkeletonContext } from '../SkeletonContext';

export const DashboardCard = ({
  icon,
  external,
  hideCta,
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
  const skeleton = useContext(SkeletonContext);
  const inlineProps = inline
    ? {
        background: undefined,
        pad: 'none',
        elevation: 'none',
        round: 'none',
      }
    : {
        // TO DO -- this is just to demo hover state
        onClick: !skeleton ? () => {} : undefined,
      };

  const skeletonProps = skeleton
    ? {
        elevation: 'none',
      }
    : {};

  return (
    <Card {...inlineProps} {...skeletonProps} {...rest}>
      <CardHeader align="start" {...inlineProps}>
        <Box direction="row" gap="small" align="start">
          {icon && (
            <Box flex={false}>
              {skeleton ? <Skeleton height="xxsmall" width="xxsmall" /> : icon}
            </Box>
          )}
          <Box gap="xsmall" flex={false}>
            <Heading level={level} margin="none">
              {title}
            </Heading>
            <Text size="small">{subtitle}</Text>
          </Box>
        </Box>
        {!hideCta ? (
          <Box flex={false}>
            {skeleton ? (
              <Skeleton pad="small" />
            ) : external ? (
              <ShareRounded
                a11yTitle={`Go to ${title}`}
                color="foreground-brand-default"
              />
            ) : (
              <LinkNext
                a11yTitle={`Go to ${title}`}
                color="foreground-brand-default"
              />
            )}
          </Box>
        ) : undefined}
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
          pad={{ horizontal: 'medium', bottom: 'medium', top: 'medium' }}
          {...inlineProps}
        >
          {skeleton ? <Skeleton height="xxsmall" /> : footer}
        </CardFooter>
      )}
    </Card>
  );
};

DashboardCard.propTypes = {
  hideCta: PropTypes.bool,
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
