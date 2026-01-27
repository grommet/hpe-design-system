/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { FormValidation } from 'aries-site/src/examples/templates/inline-notifications/InlineFormValidation';
import { InlineNotificationExample } from 'aries-site/src/examples/templates/inline-notifications/InlineNotificationExample';
import { PageBannerExample } from 'aries-site/src/examples/templates/inline-notifications/PageBannerExample';
import { PromotionExample } from 'aries-site/src/examples/templates/inline-notifications/PromotionExample';
import { StatusUpdateExample } from 'aries-site/src/examples/templates/inline-notifications/StatusUpdateExample';

const meta = {
  title: 'Inline Notifications',
};

export default meta;

export const InlineFormValidation = {
  render: () => <FormValidation />,
};

export const InlineNotification = {
  render: () => <InlineNotificationExample />,
};

export const PageBanner = {
  render: () => <PageBannerExample />,
};

export const Promotion = {
  render: () => <PromotionExample />,
};

export const StatusUpdate = {
  render: () => <StatusUpdateExample />,
};
