import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Grid, ResponsiveContext } from 'grommet';
import { Figma, Grommet } from 'grommet-icons';
import { IconCircle, IconTriangle } from '../icons';

const types = {
  figma: {
    name: 'Figma',
    icon: <Figma color="plain" size="small" />,
  },
  grommet: {
    name: 'Grommet',
    icon: <Grommet color="plain" size="small" />,
  },
};

const statuses = {
  'In Progress': {
    icon: <IconTriangle size="small" color="status-warning" />,
  },
  Complete: {
    icon: <IconCircle size="small" color="status-ok" />,
  },
};

const Badge = ({ label, icon, side, ...rest }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Box
      direction="row"
      align="center"
      gap="xsmall"
      pad={{
        vertical: size !== 'small' ? 'xxsmall' : 'small',
        horizontal: size !== 'small' ? 'small' : 'medium',
      }}
      round={{ corner: side, size: 'xsmall' }}
      {...rest}
    >
      {icon}
      {size !== 'small' && (
        <Text size="small" weight={600}>
          {label}
        </Text>
      )}
    </Box>
  );
};

Badge.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.element,
  side: PropTypes.string,
};

const StatusBadge = ({ status, type }) => {
  return (
    <Box direction="row" round="xsmall">
      <Badge
        background="background-front"
        icon={types[type].icon}
        justify="end"
        label={type && types[type].name}
        side="left"
      />
      <Badge
        background="background-contrast"
        flex
        icon={statuses[status[type]].icon}
        label={status[type]}
        side="right"
      />
    </Box>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.shape({
    figma: PropTypes.string,
    grommet: PropTypes.string,
  }),
  type: PropTypes.oneOf(['figma', 'grommet']),
};

export const Status = ({ status }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Grid
      columns={{ count: size !== 'small' ? 2 : 1, size: 'auto' }}
      gap={size !== 'small' ? 'small' : 'xsmall'}
      justify="end"
    >
      {status.figma && <StatusBadge type="figma" status={status} />}
      {status.grommet && <StatusBadge type="grommet" status={status} />}
    </Grid>
  );
};

Status.propTypes = {
  status: PropTypes.shape({
    figma: PropTypes.oneOf(['Complete', 'In Progress']),
    grommet: PropTypes.oneOf(['Complete', 'In Progress']),
  }),
};
