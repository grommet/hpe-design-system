// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Meter,
  Stack,
  Text,
} from 'grommet';

// Dashboard card surface following the overview dashboard template: header
// with a level-3 heading, optional subtitle and action; body padded
// `medium` with an `xsmall` seam to the header. Uses the temporary
// hard-coded card colour (see theme.js) and no elevation.
export const ShellCard = ({
  icon,
  title,
  subtitle,
  level = 3,
  action,
  children,
  pad,
  ...rest
}) => (
  <Card background="shell-card" elevation="none" round="medium" {...rest}>
    {(icon || title) && (
      <CardHeader
        pad={{ horizontal: 'medium', top: 'medium', bottom: 'xsmall' }}
        gap="small"
        align="start"
      >
        <Box direction="row" gap="small" align="start">
          {icon && <Box pad={{ top: '4xsmall' }}>{icon}</Box>}
          <Box>
            <Heading level={level} margin="none">
              {title}
            </Heading>
            {subtitle &&
              (typeof subtitle === 'string' ? (
                <Text size="small">{subtitle}</Text>
              ) : (
                subtitle
              ))}
          </Box>
        </Box>
        {action}
      </CardHeader>
    )}
    <CardBody
      pad={
        pad || {
          horizontal: 'medium',
          bottom: 'medium',
          top: icon || title ? 'xsmall' : 'medium',
        }
      }
      gap="small"
      flex
    >
      {children}
    </CardBody>
  </Card>
);

ShellCard.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  level: PropTypes.number,
  action: PropTypes.node,
  children: PropTypes.node,
  pad: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export const Legend = ({ values, showValues = true }) => (
  <Box gap="3xsmall" flex>
    {values.map(item => (
      <Box key={item.label} direction="row" justify="between" gap="small">
        <Box direction="row" gap="xsmall" align="center">
          <Box
            width="8px"
            height="8px"
            round="full"
            background={item.color}
            flex={false}
          />
          <Text size="xsmall">{item.label}</Text>
        </Box>
        {showValues && (
          <Text size="xsmall" color="text-strong">
            {item.value}
          </Text>
        )}
      </Box>
    ))}
  </Box>
);

Legend.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
  showValues: PropTypes.bool,
};

// Circular meter with a centred total, matching the design's summary donuts.
// xxsmall (128px) with a small (16px) ring leaves a 96px hole, enough for
// the total and its unit to sit clear of the ring; 3xsmall was too tight.
export const DonutMetric = ({ total, unit, values, direction = 'row' }) => (
  <Box direction={direction} gap="medium" align="center" wrap>
    <Stack anchor="center">
      <Meter
        type="circle"
        size="xxsmall"
        thickness="small"
        max={total || 1}
        values={values.map(item => ({
          value: item.value,
          color: item.color,
          label: item.label,
        }))}
        a11yTitle={`${total} ${unit || 'total'}`}
      />
      <Box align="center">
        <Text size="xxlarge" weight={500} color="text-strong">
          {total}
        </Text>
        <Text size="small" color="text-weak">
          {unit}
        </Text>
      </Box>
    </Stack>
    <Legend values={values} />
  </Box>
);

DonutMetric.propTypes = {
  total: PropTypes.number.isRequired,
  unit: PropTypes.string,
  values: Legend.propTypes.values,
  direction: PropTypes.oneOf(['row', 'column']),
};
