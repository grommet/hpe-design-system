import React from 'react';
import PropTypes from 'prop-types';
import { Notification } from 'grommet';

export const DateTimeNotificationExample = ({ bestPractice = true }) => {
  const maintenanceDate = new Date(Date.UTC(2023, 10, 10, 7, 59, 0));
  const mockNow = new Date(Date.UTC(2023, 10, 7, 0, 0, 0));

  const daysDifference = Math.floor(
    (maintenanceDate.getTime() - mockNow.getTime()) / (1000 * 3600 * 24),
  );

  const relativeTimeFormat = new Intl.RelativeTimeFormat('en', {
    style: 'short',
  }).format(daysDifference, 'day');

  const localeFormat = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Los_Angeles',
  }).format(maintenanceDate);

  return (
    <Notification
      message={`Your subscription will be ending ${relativeTimeFormat}${
        bestPractice ? ` (${localeFormat})` : ''
      }.`}
      status="warning"
      actions={[{ label: 'Renew subscription' }]}
    />
  );
};

DateTimeNotificationExample.propTypes = {
  bestPractice: PropTypes.bool,
};
