import React from 'react';
/* eslint-disable max-len */
import { BannerContentLayoutExample } from 'aries-site/src/examples/templates/global-banner-notifications/BannerContentLayoutExample';
import { BannerNotificationCritical } from 'aries-site/src/examples/templates/global-banner-notifications/Examples/BannerNotificationCritical';
import { BannerNotificationCriticalClose } from 'aries-site/src/examples/templates/global-banner-notifications/Examples/BannerNotificationCriticalClose';
import { BannerNotificationInfo } from 'aries-site/src/examples/templates/global-banner-notifications/Examples/BannerNotificationInfo';
import { BannerNotificationWarning } from 'aries-site/src/examples/templates/global-banner-notifications/Examples/BannerNotificationWarning';
import { BannerNotificationWarningClose } from 'aries-site/src/examples/templates/global-banner-notifications/Examples/BannerNotificationWarningClose';

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
