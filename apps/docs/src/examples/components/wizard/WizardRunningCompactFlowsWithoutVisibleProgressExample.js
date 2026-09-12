// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import {
  Box,
  FormField,
  NameValueList,
  NameValuePair,
  RadioButtonGroup,
  TextArea,
  TextInput,
  Wizard,
} from 'grommet';

const steps = [
  {
    id: 'request',
    title: 'Add name and description',
    description: 'Provide a name and description for the new role.',
    render: () => (
      <Box height={{ min: 'medium' }} width="medium">
        <FormField
          htmlFor="wizard-role-name"
          label="Role name"
          name="roleName"
          required
        >
          <TextInput
            id="wizard-role-name"
            name="roleName"
            placeholder="Network Engineer"
          />
        </FormField>
        <FormField
          htmlFor="wizard-role-description"
          label="Role description"
          name="roleDescription"
        >
          <TextArea
            id="wizard-role-description"
            name="roleDescription"
            placeholder="Can view and manage devices in device inventory"
          />
        </FormField>
      </Box>
    ),
    validate: value =>
      value.roleName ? true : 'Enter a role name before continuing.',
  },
  {
    id: 'reason',
    title: 'Add permissions',
    description: 'Choose the permissions this role should have.',
    render: () => (
      <Box height={{ min: 'medium' }} width="medium">
        <FormField
          htmlFor="wizard-permissions"
          label="Permissions"
          name="permissions"
        >
          <RadioButtonGroup
            id="wizard-permissions"
            name="permissions"
            options={[
              'View devices',
              'Manage devices',
              'Manage device inventory',
            ]}
          />
        </FormField>
      </Box>
    ),
  },
  {
    id: 'review',
    title: 'Review & create',
    description: 'Review the role before creating it.',
    render: (_step, { formValue }) => (
      <Box gap="small" height={{ min: 'medium' }} width="medium">
        <NameValueList>
          <NameValuePair name="Role name">
            {formValue.roleName || '--'}
          </NameValuePair>
          <NameValuePair name="Role description">
            {formValue.roleDescription || '--'}
          </NameValuePair>
          <NameValuePair name="Permissions">
            {formValue.permissions || '--'}
          </NameValuePair>
        </NameValueList>
      </Box>
    ),
  },
];

export const WizardRunningCompactFlowsWithoutVisibleProgressExample = () => (
  <Box background="transparent" fill>
    <Wizard
      defaultValue={{
        permissions: 'View devices',
        roleDescription: 'Can view and manage devices in device inventory',
        roleName: 'Network Engineer',
      }}
      messages={{ complete: 'Create role' }}
      scrollToTop={false}
      showProgress={false}
      steps={steps}
      title="Create role"
    />
  </Box>
);