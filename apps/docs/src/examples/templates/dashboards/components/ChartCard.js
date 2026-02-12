import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ResponsiveContext,
  ThemeContext,
} from 'grommet';
import { DashboardCardHeader } from '.';

export const ChartCard = ({
  title,
  subtitle,
  children,
  footer,
  onClick,
  ...rest
}) => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const { body, header, footer: footerTheme } = theme.card;

  return (
    <Card onClick={onClick} {...rest}>
      <CardHeader
        pad={
          ['xsmall', 'small'].includes(size)
            ? { horizontal: 'xlarge', top: 'xlarge', bottom: header.pad }
            : { horizontal: header.pad, top: header.pad, bottom: 'xsmall' }
        }
      >
        <DashboardCardHeader title={title} level={2} subtitle={subtitle} />
      </CardHeader>
      <CardBody
        pad={
          ['xsmall', 'small'].includes(size)
            ? { horizontal: 'xlarge', top: body.pad, bottom: 'xlarge' }
            : { horizontal: body.pad, top: 'xsmall', bottom: body.pad }
        }
      >
        {children}
      </CardBody>
      {footer && (
        <CardFooter
          pad={
            ['xsmall', 'small'].includes(size)
              ? { horizontal: 'xlarge', top: body.pad, bottom: 'xlarge' }
              : footerTheme.pad
          }
          border={{ side: 'top', color: 'border-weak' }}
        >
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

ChartCard.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.node,
  onClick: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};
