/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { BannerContentLayoutExample } from 'apps/docs/src/examples/templates/global-banner-notifications/BannerContentLayoutExample';
import { BannerNotificationCritical } from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationCritical';
import { BannerNotificationCriticalClose } from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationCriticalClose';
import { BannerNotificationInfo } from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationInfo';
import { BannerNotificationWarning } from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationWarning';
import { BannerNotificationWarningClose } from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationWarningClose';

const meta = {
  title: 'Global Notifications',
};

export default meta;

export const ContentLayout = {
  render: () => <BannerContentLayoutExample />,
};

export const Critical = {
  render: () => <BannerNotificationCritical />,
};

export const CriticalClose = {
  render: () => <BannerNotificationCriticalClose />,
};

export const Info = {
  render: () => <BannerNotificationInfo />,
};

export const Warning = {
  render: () => <BannerNotificationWarning />,
};

export const WarningClose = {
  render: () => <BannerNotificationWarningClose />,
};
