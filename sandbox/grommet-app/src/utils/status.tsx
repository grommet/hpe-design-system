import React from 'react';
import {
  StatusCriticalSmall,
  StatusDisabled,
  StatusGoodSmall,
  StatusUnknownSmall,
  StatusWarningSmall
} from "grommet-icons";

export const statusMap = new Map([
  ['critical', {
    icon: <StatusCriticalSmall />,
    color: 'status-critical',
  }],
  ['warning', {
    icon: <StatusWarningSmall />,
    color: 'status-warning',
  }],
  ['ok', {
    icon: <StatusGoodSmall />,
    color: 'status-ok',
  }],
  ['unknown', {
    icon: <StatusUnknownSmall />,
    color: 'status-unknown',
  }],
  ['unsupported', {
    icon: <StatusDisabled />,
    color: 'status-unknown',
  }],
]);
