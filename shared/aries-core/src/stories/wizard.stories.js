/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
import { TwoColumnWizardExample } from 'apps/docs/src/examples/templates/wizard/TwoColumnWizardExample';
import { WizardValidationExample } from 'apps/docs/src/examples/templates/wizard/WizardValidationExample';
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
