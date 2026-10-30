// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, CheckBox, FormField, Select, TextInput } from 'grommet';
import { FormSection } from './FormSection';
import { regions } from './data';

// Wizard renders this step inside its own Form bound to the wizard value,
// so the fields only need a `name`.
export const NetworkingStep = () => (
  <Box gap="large">
    <FormSection title="Choose a region">
      <Box width="medium">
        <FormField htmlFor="region" name="region" label="Region" required>
          <Select
            id="region"
            name="region"
            options={regions}
            placeholder="Select a region"
          />
        </FormField>
      </Box>
    </FormSection>
    <FormSection title="Network settings">
      <Box width="medium">
        <FormField
          htmlFor="networkName"
          name="networkName"
          label="Network name"
          help="Leave blank to use the default network."
        >
          <TextInput
            id="networkName"
            name="networkName"
            placeholder="vpc-prod-01"
          />
        </FormField>
      </Box>
      <CheckBox
        id="publicAccess"
        name="publicAccess"
        label="Allow public access"
        toggle
      />
      <CheckBox
        id="autoScaling"
        name="autoScaling"
        label="Enable auto-scaling"
        toggle
      />
    </FormSection>
  </Box>
);
