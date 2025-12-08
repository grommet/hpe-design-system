import React from 'react';
/* eslint-disable max-len */
import { TwoColumnWizardExample } from 'aries-site/src/examples/templates/wizard/TwoColumnWizardExample';
import { WizardValidationExample } from 'aries-site/src/examples/templates/wizard/WizardValidationExample';

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
