/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
import { FormValidation } from 'apps/docs/src/examples/templates/inline-notifications/InlineFormValidation';
import { InlineNotificationExample } from 'apps/docs/src/examples/templates/inline-notifications/InlineNotificationExample';
import { PageBannerExample } from 'apps/docs/src/examples/templates/inline-notifications/PageBannerExample';
import { PromotionExample } from 'apps/docs/src/examples/templates/inline-notifications/PromotionExample';
import { StatusUpdateExample } from 'apps/docs/src/examples/templates/inline-notifications/StatusUpdateExample';
import FormValidationSource from 'apps/docs/src/examples/templates/inline-notifications/InlineFormValidation.js?raw';
import InlineNotificationExampleSource from 'apps/docs/src/examples/templates/inline-notifications/InlineNotificationExample.js?raw';
import PageBannerExampleSource from 'apps/docs/src/examples/templates/inline-notifications/PageBannerExample.js?raw';
import PromotionExampleSource from 'apps/docs/src/examples/templates/inline-notifications/PromotionExample.js?raw';
import StatusUpdateExampleSource from 'apps/docs/src/examples/templates/inline-notifications/StatusUpdateExample.js?raw';

const meta = {
  title: 'Patterns/Inline Notifications',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

export const InlineFormValidation = {
  render: () => <FormValidation />,
  parameters: {
    docs: {
      source: {
        code: FormValidationSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const InlineNotification = {
  render: () => <InlineNotificationExample />,
  parameters: {
    layout: 'fullscreen',
    full: true,
    docs: {
      source: {
        code: InlineNotificationExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const PageBanner = {
  render: () => <PageBannerExample />,
  parameters: {
    docs: {
      source: {
        code: PageBannerExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
    layout: 'fullscreen',
    background: 'background-back',
  },
};

export const Promotion = {
  render: () => <PromotionExample />,
  parameters: {
    docs: {
      source: {
        code: PromotionExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
    layout: 'fullscreen',
    background: 'background-back',
  },
};

export const StatusUpdate = {
  render: () => <StatusUpdateExample />,
  parameters: {
    docs: {
      source: {
        code: StatusUpdateExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
