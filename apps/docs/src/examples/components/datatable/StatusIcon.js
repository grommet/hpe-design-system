import PropTypes from 'prop-types';

import {
  StatusGood,
  StatusWarning,
  StatusUnknown,
  StatusCritical,
} from '@hpe-design/icons-grommet';

const statusIcons = {
  critical: StatusCritical,
  ok: StatusGood,
  unknown: StatusUnknown,
  warning: StatusWarning,
};
export const StatusIcon = ({ status, ...rest }) => {
  const Icon = statusIcons[status] || StatusUnknown;
  return <Icon color={`status-${status}`} size="small" {...rest} />;
};

StatusIcon.propTypes = {
  status: PropTypes.oneOf(['critical', 'ok', 'unknown', 'warning']).isRequired,
};
