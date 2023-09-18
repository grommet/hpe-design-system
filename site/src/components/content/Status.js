import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { Figma, Grommet } from 'grommet-icons';
import { TextEmphasis } from 'library';
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
      pad={{ vertical: 'xsmall', horizontal: 'small' }}
      round={{ corner: 'left', size: 'xsmall' }}
      direction="row"
    >
      <Box direction="row" gap="xsmall" align="center">
        {types[type].icon}
        <TextEmphasis>{type && types[type].name}</TextEmphasis>
      </Box>
    </Box>
    <Box
      background="background-contrast"
      pad={{ vertical: 'xsmall', horizontal: 'small' }}
      round={{ corner: 'right', size: 'xsmall' }}
      direction="row"
      align="center"
      gap="small"
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
