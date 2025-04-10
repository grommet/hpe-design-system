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
import { WorkspaceContext } from '../../contexts';

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
  const { workspace } = useContext(WorkspaceContext);
  const inlineProps = inline
    ? {
        background: undefined,
        pad: 'none',
        elevation: 'none',
        round: 'none',
      }
    : {};

  const skeletonProps = skeleton
    ? {
        elevation: 'none',
      }
    : {};

  const animation = !skeleton ? 'fadeIn' : undefined;
  return (
    <Card
      {...inlineProps}
      // this is just to demo hover state
      {...(!inline ? { onClick: () => {} } : {})}
      {...skeletonProps}
      {...rest}
    >
      <CardHeader align="start" animation={animation} {...inlineProps}>
        <Box direction="row" gap="xsmall" align="start">
          {icon && (
            <Box flex={false}>
              {skeleton ? <Skeleton height="xxsmall" width="xxsmall" /> : icon}
            </Box>
          )}
          <Box gap="3xsmall" flex={false}>
            <Heading level={level} margin="none">
              {title}
            </Heading>
            <Text size="small">{subtitle}</Text>
          </Box>
        </Box>
        {!hideCta ? (
          <Box flex={false}>
            {skeleton ? (
              <Skeleton pad="xsmall" />
            ) : external ? (
              <ShareRounded
                a11yTitle={`Go to ${title}`}
                color="icon-primary"
                data-icon={
                  !inline && workspace === 'Acme Next' ? 'dashboard' : ''
                }
              />
            ) : (
              <LinkNext
                a11yTitle={`Go to ${title}`}
                color="icon-primary"
                data-icon={
                  !inline && workspace === 'Acme Next' ? 'dashboard' : ''
                }
              />
            )}
          </Box>
        ) : undefined}
      </CardHeader>
      {children && (
        <CardBody
          pad={{ horizontal: 'medium', bottom: !footer ? 'medium' : undefined }}
          {...inlineProps}
          animation={animation}
        >
          {children}
        </CardBody>
      )}
      {footer && (
        <CardFooter
          pad={{ horizontal: 'medium', bottom: 'medium', top: 'medium' }}
          {...inlineProps}
          animation={animation}
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
