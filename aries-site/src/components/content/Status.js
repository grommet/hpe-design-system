import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
// TODO replace with DS icon package when available
import { Figma, Grommet } from 'grommet-icons';
import { TextEmphasis } from 'aries-core';
import { IconCircle, IconTriangle } from '../icons';

const types = {
  figma: {
    name: 'Figma',
    icon: <Figma color="plain" />,
  },
  grommet: {
    name: 'Grommet',
    icon: <Grommet color="plain" />,
  },
};

const statuses = {
  'In progress': {
    icon: <IconTriangle size="small" color="status-warning" />,
  },
  Complete: {
    icon: <IconCircle size="small" color="status-ok" />,
  },
};

const StatusBadge = ({ status, type }) => (
  <Box direction="row">
    <Box
      background="background-front"
      pad={{ vertical: '3xsmall', horizontal: 'xsmall' }}
      round={{ corner: 'left', size: 'xsmall' }}
      direction="row"
    >
      <Box direction="row" gap="3xsmall" align="center">
        {types[type].icon}
        <TextEmphasis>{type && types[type].name}</TextEmphasis>
      </Box>
    </Box>
    <Box
      background="background-contrast"
      pad={{ vertical: '3xsmall', horizontal: 'xsmall' }}
      round={{ corner: 'right', size: 'xsmall' }}
      direction="row"
      align="center"
      gap="xsmall"
    >
      {statuses[status[type]].icon}
      <TextEmphasis>{status[type]}</TextEmphasis>
    </Box>
  </Box>
);

StatusBadge.propTypes = {
  status: PropTypes.shape({
    figma: PropTypes.string,
    grommet: PropTypes.string,
  }),
  type: PropTypes.oneOf(['figma', 'grommet']),
};

export const Status = ({ status }) => (
  <Box direction="row-responsive" gap="medium">
    {status.figma && <StatusBadge type="figma" status={status} />}
    {status.grommet && <StatusBadge type="grommet" status={status} />}
  </Box>
);

Status.propTypes = {
  status: PropTypes.shape({
    figma: PropTypes.oneOf(['Complete', 'In progress']),
    grommet: PropTypes.oneOf(['Complete', 'In progress']),
  }),
};
