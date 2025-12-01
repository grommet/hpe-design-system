import React from 'react';
/* eslint-disable max-len */
import { FormValidation } from 'aries-site/src/examples/templates/inline-notifications/InlineFormValidation';
import { InlineNotificationExample } from 'aries-site/src/examples/templates/inline-notifications/InlineNotificationExample';
import { PageBannerExample } from 'aries-site/src/examples/templates/inline-notifications/PageBannerExample';
import { PromotionExample } from 'aries-site/src/examples/templates/inline-notifications/PromotionExample';
import { StatusUpdateExample } from 'aries-site/src/examples/templates/inline-notifications/StatusUpdateExample';

export const InlineFormValidation = () => <FormValidation />;
export const InlineNotification = () => <InlineNotificationExample />;
export const PageBanner = () => <PageBannerExample />;
export const Promotion = () => <PromotionExample />;
export const StatusUpdate = () => <StatusUpdateExample />;

export default {
  title: 'Inline Notifications',
};
