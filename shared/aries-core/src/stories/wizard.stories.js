// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CenteredOnPageWizardExample } from 'apps/docs/src/examples/templates/wizard/CenteredOnPageWizardExample';
import { LeftAlignedOnPageWizardExample } from 'apps/docs/src/examples/templates/wizard/LeftAlignedOnPageWizardExample';
import { OnPageWizardExample } from 'apps/docs/src/examples/templates/wizard/OnPageWizardExample';
import { TwoColumnWizardExample } from 'apps/docs/src/examples/templates/wizard/TwoColumnWizardExample';
import { WizardValidationExample } from 'apps/docs/src/examples/templates/wizard/WizardValidationExample';
import CenteredOnPageWizardExampleSource from 'apps/docs/src/examples/templates/wizard/CenteredOnPageWizardExample.js?raw';
import LeftAlignedOnPageWizardExampleSource from 'apps/docs/src/examples/templates/wizard/LeftAlignedOnPageWizardExample.js?raw';
import OnPageWizardExampleSource from 'apps/docs/src/examples/templates/wizard/OnPageWizardExample.js?raw';
import TwoColumnWizardExampleSource from 'apps/docs/src/examples/templates/wizard/TwoColumnWizardExample.js?raw';
import WizardValidationExampleSource from 'apps/docs/src/examples/templates/wizard/WizardValidationExample.js?raw';

const meta = {
  title: 'Patterns/Wizard',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

export const TwoColumnWizard = {
  render: () => <TwoColumnWizardExample />,
  parameters: {
    docs: {
      source: {
        code: TwoColumnWizardExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const WizardValidation = {
  render: () => <WizardValidationExample />,
  parameters: {
    docs: {
      source: {
        code: WizardValidationExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const OnPageWizard = {
  render: () => <OnPageWizardExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: OnPageWizardExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const CenteredOnPageWizard = {
  render: () => <CenteredOnPageWizardExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: CenteredOnPageWizardExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const LeftAlignedOnPageWizard = {
  render: () => <LeftAlignedOnPageWizardExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: LeftAlignedOnPageWizardExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
