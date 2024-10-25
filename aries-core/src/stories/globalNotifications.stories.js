import React from 'react';
/* eslint-disable max-len */
import { BannerContentLayoutExample } from 'aries-site/src/examples/templates/global-banner-notifications/BannerContentLayoutExample';
import { BannerNotificationCritical } from 'aries-site/src/examples/templates/global-banner-notifications/Examples/BannerNotificationCritical';
import { BannerNotificationCriticalClose } from 'aries-site/src/examples/templates/global-banner-notifications/Examples/BannerNotificationCriticalClose';
import { BannerNotificationInfo } from 'aries-site/src/examples/templates/global-banner-notifications/Examples/BannerNotificationInfo';
import { BannerNotificationWarning } from 'aries-site/src/examples/templates/global-banner-notifications/Examples/BannerNotificationWarning';
import { BannerNotificationWarningClose } from 'aries-site/src/examples/templates/global-banner-notifications/Examples/BannerNotificationWarningClose';

export const ContentLayout = () => <BannerContentLayoutExample />;
export const Critical = () => <BannerNotificationCritical />;
export const CriticalClose = () => <BannerNotificationCriticalClose />;
export const Info = () => <BannerNotificationInfo />;
export const Warning = () => <BannerNotificationWarning />;
export const WarningClose = () => <BannerNotificationWarningClose />;

export default {
  title: 'Global Notifications',
};
