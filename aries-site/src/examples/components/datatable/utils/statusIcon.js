import {
  StatusGood,
  StatusWarning,
  StatusUnknown,
  StatusCritical,
} from '@hpe-design/icons-grommet';

// Map status labels to their corresponding icon components
export const statusIcons = {
  critical: StatusCritical,
  ok: StatusGood,
  unknown: StatusUnknown,
  warning: StatusWarning,
};

export const getStatusIcon = statusLabel => {
  return statusIcons[statusLabel] || StatusUnknown;
};
