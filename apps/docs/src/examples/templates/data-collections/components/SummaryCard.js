// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Collapsible,
  Heading,
  Text,
} from 'grommet';

// A summary metric that can expand to show its supporting chart and detail.
// The headline value in `children` is always visible; `subtitle`, `detail`,
// and `footer` are wrapped in Collapsible so that toggling `detailed` on the
// page animates every card open or closed together.
export const SummaryCard = ({
  children,
  detail,
  detailed = false,
  footer,
  level = 2,
  subtitle,
  title,
  ...rest
}) => (
  <Card {...rest}>
    {/* The header's bottom padding is removed so the title and headline value
        are separated by the body's padding alone (one spacing step). */}
    <CardHeader pad={{ horizontal: 'medium', top: 'medium', bottom: 'none' }}>
      <Box fill="horizontal">
        <Heading level={level} margin="none">
          {title}
        </Heading>
        {subtitle && (
          <Collapsible open={detailed}>
            <Box pad={{ top: '6xsmall' }}>
              <Text size="small">{subtitle}</Text>
            </Box>
          </Collapsible>
        )}
      </Box>
    </CardHeader>
    <CardBody>
      {children}
      {(detail || footer) && (
        <Collapsible open={detailed}>
          <Box pad={{ top: 'medium' }} gap="medium">
            {detail}
            {footer && <Text>{footer}</Text>}
          </Box>
        </Collapsible>
      )}
    </CardBody>
  </Card>
);

SummaryCard.propTypes = {
  children: PropTypes.node,
  detail: PropTypes.node,
  detailed: PropTypes.bool,
  footer: PropTypes.node,
  level: PropTypes.number,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};
