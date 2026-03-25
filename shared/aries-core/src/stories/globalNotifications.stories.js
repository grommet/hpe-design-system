/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
import { BannerContentLayoutExample } from 'apps/docs/src/examples/templates/global-banner-notifications/BannerContentLayoutExample';
import { BannerNotificationCritical } from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationCritical';
import { BannerNotificationCriticalClose } from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationCriticalClose';
import { BannerNotificationInfo } from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationInfo';
import { BannerNotificationWarning } from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationWarning';
import { BannerNotificationWarningClose } from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationWarningClose';
import BannerContentLayoutExampleSource from 'apps/docs/src/examples/templates/global-banner-notifications/BannerContentLayoutExample.js?raw';
import BannerNotificationCriticalSource from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationCritical.js?raw';
import BannerNotificationCriticalCloseSource from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationCriticalClose.js?raw';
import BannerNotificationInfoSource from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationInfo.js?raw';
import BannerNotificationWarningSource from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationWarning.js?raw';
import BannerNotificationWarningCloseSource from 'apps/docs/src/examples/templates/global-banner-notifications/Examples/BannerNotificationWarningClose.js?raw';

const meta = {
  title: 'Patterns/Global Notifications',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

export const ContentLayout = {
  render: () => <BannerContentLayoutExample />,
  parameters: {
    docs: {
      source: {
        code: BannerContentLayoutExampleSource,
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

export const Critical = {
  render: () => <BannerNotificationCritical />,
  parameters: {
    docs: {
      source: {
        code: BannerNotificationCriticalSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const CriticalClose = {
  render: () => <BannerNotificationCriticalClose />,
  parameters: {
    docs: {
      source: {
        code: BannerNotificationCriticalCloseSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const Info = {
  render: () => <BannerNotificationInfo />,
  parameters: {
    docs: {
      source: {
        code: BannerNotificationInfoSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const Warning = {
  render: () => <BannerNotificationWarning />,
  parameters: {
    docs: {
      source: {
        code: BannerNotificationWarningSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const WarningClose = {
  render: () => <BannerNotificationWarningClose />,
  parameters: {
    docs: {
      source: {
        code: BannerNotificationWarningCloseSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
