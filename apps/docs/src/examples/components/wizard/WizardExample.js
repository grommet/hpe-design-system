// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import {
  Box,
  FormField,
  Select,
  Text,
  TextInput,
  Wizard,
} from 'grommet';

const steps = [
  {
    id: 'project',
    title: 'Project details',
    description: 'Name the project and choose its region.',
    render: () => (
      <Box width="medium">
        <FormField
          htmlFor="wizard-project-title"
          label="Project name"
          name="projectName"
          required
        >
          <TextInput
            id="wizard-project-title"
            name="projectName"
            placeholder="Network modernization"
          />
        </FormField>
        <FormField htmlFor="wizard-project-region" label="Region" name="region">
          <Select
            id="wizard-project-region"
            name="region"
            options={['North America', 'Europe', 'Asia Pacific']}
          />
        </FormField>
      </Box>
    ),
    validate: value =>
      value.projectName ? true : 'Enter a project name before continuing.',
  },
  {
    id: 'owner',
    title: 'Project owner',
    description: 'Assign the person responsible for this project.',
    render: () => (
      <Box width="medium">
        <FormField htmlFor="wizard-owner-name" label="Owner" name="owner">
          <TextInput
            id="wizard-owner-name"
            name="owner"
            placeholder="Alex Morgan"
          />
        </FormField>
      </Box>
    ),
  },
  {
    id: 'review',
    title: 'Review project',
    description: 'Confirm the project details before creating it.',
    render: (_step, { formValue }) => (
      <Box gap="small" width="medium">
        <Text>Project: {formValue.projectName || '--'}</Text>
        <Text>Region: {formValue.region || '--'}</Text>
        <Text>Owner: {formValue.owner || '--'}</Text>
      </Box>
    ),
  },
];

export const WizardExample = () => (
  <Box background="transparent" fill>
    <Wizard
      defaultValue={{
        owner: 'Alex Morgan',
        projectName: 'Network modernization',
        region: 'North America',
      }}
      messages={{ complete: 'Create project' }}
      scrollToTop={false}
      showProgress="horizontal"
      steps={steps}
      title="Create project"
    />
  </Box>
);