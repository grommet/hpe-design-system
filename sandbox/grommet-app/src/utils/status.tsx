import React from 'react';
import { StatusCritical, StatusDisabled, StatusGood, StatusUnknown, StatusWarning } from "grommet-icons";

export const statusMap = new Map([
  ['critical', {
    icon: <StatusCritical />,
    color: 'status-critical',
  }],
  ['warning', {
    icon: <StatusWarning />,
    color: 'status-warning',
  }],
  ['ok', {
    icon: <StatusGood />,
    color: 'status-ok',
  }],
  ['unknown', {
    icon: <StatusUnknown />,
    color: 'status-unknown',
  }],
  ['unsupported', {
    icon: <StatusDisabled />,
    color: 'status-unknown',
  }],
]);