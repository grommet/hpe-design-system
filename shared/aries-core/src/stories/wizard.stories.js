/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { TwoColumnWizardExample } from 'apps/aries-site/src/examples/templates/wizard/TwoColumnWizardExample';
import { WizardValidationExample } from 'apps/aries-site/src/examples/templates/wizard/WizardValidationExample';

const meta = {
  title: 'Wizard',
};

export default meta;

export const TwoColumnWizard = {
  render: () => <TwoColumnWizardExample />,
};

export const WizardValidation = {
  render: () => <WizardValidationExample />,
};
