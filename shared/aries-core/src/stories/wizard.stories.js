// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import { Box, ResponsiveContext } from 'grommet';
// apps/docs resolves its own grommet copy, which has a separate
// ResponsiveContext from the one provided by the Storybook <Grommet>.
import { ResponsiveContext as DocsResponsiveContext } from 'apps/docs/node_modules/grommet';
import { AddResourceWizard } from 'apps/docs/src/examples/templates/wizard/AddResourceWizard';
import { TwoColumnWizardExample } from 'apps/docs/src/examples/templates/wizard/TwoColumnWizardExample';
import { WizardValidationExample } from 'apps/docs/src/examples/templates/wizard/WizardValidationExample';
import AddResourceWizardSource from 'apps/docs/src/examples/templates/wizard/AddResourceWizard.tsx?raw';
import TwoColumnWizardExampleSource from 'apps/docs/src/examples/templates/wizard/TwoColumnWizardExample.js?raw';
import WizardValidationExampleSource from 'apps/docs/src/examples/templates/wizard/WizardValidationExample.js?raw';

const meta = {
  title: 'Patterns/Wizard',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

const withDocsResponsiveContext = Story => {
  const size = useContext(ResponsiveContext);
  return (
    <DocsResponsiveContext.Provider value={size}>
      <Story />
    </DocsResponsiveContext.Provider>
  );
};

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

export const AddResource = {
  render: () => (
    // constrain to the viewport so the wizard body scrolls between the
    // sticky header and footer, as it would in a full-page app
    <Box height="100vh">
      <AddResourceWizard />
    </Box>
  ),
  decorators: [withDocsResponsiveContext],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: AddResourceWizardSource,
        language: 'tsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
