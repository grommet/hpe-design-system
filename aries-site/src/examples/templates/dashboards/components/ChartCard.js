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
            ? { horizontal: 'large', top: 'large', bottom: body.pad }
            : header.pad
        }
      >
        <DashboardCardHeader title={title} subtitle={subtitle} />
      </CardHeader>
      <CardBody
        pad={
          ['xsmall', 'small'].includes(size)
            ? { horizontal: 'large', top: body.pad, bottom: 'large' }
            : body.pad
        }
      >
        {children}
      </CardBody>
      {footer && (
        <CardFooter
          pad={
            ['xsmall', 'small'].includes(size)
              ? { horizontal: 'large', top: body.pad, bottom: 'large' }
              : footerTheme.pad
          }
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
