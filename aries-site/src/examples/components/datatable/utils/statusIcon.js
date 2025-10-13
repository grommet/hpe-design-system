import {
  StatusGoodSmall,
  StatusWarningSmall,
  StatusUnknownSmall,
  StatusCriticalSmall,
} from 'grommet-icons';

// Map status labels to their corresponding icon components
export const statusIcons = {
  critical: StatusCriticalSmall,
  normal: StatusGoodSmall,
  unknown: StatusUnknownSmall,
  warning: StatusWarningSmall,
};

export const getStatusIcon = statusLabel => {
  return statusIcons[statusLabel] || StatusUnknownSmall;
};
