// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import {
  Box,
  CheckBox,
  CheckBoxGroup,
  FormField,
  NameValueList,
  NameValuePair,
  RadioButtonGroup,
  Select,
  TextInput,
  Wizard,
} from 'grommet';

const stepContentProps = {
  height: { min: 'medium' },
  width: 'medium',
};

const steps = [
  {
    id: 'account',
    title: 'Select infrastructure',
    children: [
      {
        id: 'organization',
        title: 'Choose devices',
        description: 'Select the infrastructure to claim for this workspace.',
        render: () => (
          <Box {...stepContentProps}>
            <FormField
              htmlFor="wizard-device-search"
              label="Search infrastructure"
              name="deviceSearch"
            >
              <TextInput
                id="wizard-device-search"
                name="deviceSearch"
                placeholder="Search by name, model, or IP address"
              />
            </FormField>
            <FormField
              htmlFor="wizard-devices"
              label="Infrastructure"
              name="devices"
            >
              <CheckBoxGroup
                id="wizard-devices"
                name="devices"
                options={[
                  '381503203842 - Access point AP-223',
                  '734897557894 - Access point AP-223',
                  '980543203842 - Access point AP-223',
                ]}
              />
            </FormField>
          </Box>
        ),
        validate: value =>
          value.devices?.length
            ? true
            : 'Select at least one device before continuing.',
      },
      {
        id: 'owner',
        title: 'Infrastructure details',
        description:
          'Confirm the account and location for the selected devices.',
        render: () => (
          <Box {...stepContentProps}>
            <FormField
              htmlFor="wizard-account"
              label="Account"
              name="account"
              required
            >
              <TextInput
                id="wizard-account"
                name="account"
                placeholder="Acme Workspace"
              />
            </FormField>
            <FormField
              htmlFor="wizard-location"
              label="Location"
              name="location"
            >
              <Select
                id="wizard-location"
                name="location"
                options={['Austin data center', 'Boston data center']}
              />
            </FormField>
          </Box>
        ),
        validate: value =>
          value.account ? true : 'Enter an account before continuing.',
      },
    ],
  },
  {
    id: 'configuration',
    title: 'Select services',
    children: [
      {
        id: 'network',
        title: 'Choose services',
        description: 'Select the services to claim with the infrastructure.',
        render: () => (
          <Box {...stepContentProps}>
            <FormField
              htmlFor="wizard-service-type"
              label="Service type"
              name="serviceType"
            >
              <Select
                id="wizard-service-type"
                name="serviceType"
                options={['Monitoring', 'Device management', 'Analytics']}
              />
            </FormField>
            <FormField
              htmlFor="wizard-service-package"
              label="Service package"
              name="servicePackage"
            >
              <RadioButtonGroup
                id="wizard-service-package"
                name="servicePackage"
                options={['Standard', 'Advanced']}
              />
            </FormField>
            <FormField
              htmlFor="wizard-auto-renew"
              name="autoRenew"
            >
              <CheckBox
                id="wizard-auto-renew"
                label="Enable automatic renewal"
                name="autoRenew"
              />
            </FormField>
          </Box>
        ),
      },
      {
        id: 'security',
        title: 'Service details',
        description: 'Set the service details for the claim.',
        render: () => (
          <Box {...stepContentProps}>
            <FormField
              htmlFor="wizard-contract"
              label="Contract"
              name="contract"
            >
              <RadioButtonGroup
                id="wizard-contract"
                name="contract"
                options={['Monthly', 'Annual']}
              />
            </FormField>
          </Box>
        ),
      },
    ],
  },
  {
    id: 'review',
    title: 'Review & activate',
    description: 'Review the claim before activating the services.',
    render: (_step, { formValue }) => (
      <Box {...stepContentProps} gap="small">
        <NameValueList>
          <NameValuePair name="Account">
            {formValue.account || 'Acme Workspace'}
          </NameValuePair>
          <NameValuePair name="Devices">
            {formValue.devices?.join(', ') || '--'}
          </NameValuePair>
          <NameValuePair name="Service">
            {formValue.serviceType || '--'}
          </NameValuePair>
          <NameValuePair name="Package">
            {formValue.servicePackage || '--'}
          </NameValuePair>
          <NameValuePair name="Contract">
            {formValue.contract || '--'}
          </NameValuePair>
        </NameValueList>
      </Box>
    ),
  },
];

export const WizardCompletingGroupedSetupTasksExample = () => (
  <Box background="transparent" fill>
    <Wizard
      defaultValue={{
        account: 'Acme Workspace',
        autoRenew: true,
        contract: 'Annual',
        devices: ['381503203842 - Access point AP-223'],
        location: 'Austin data center',
        servicePackage: 'Advanced',
        serviceType: 'Device management',
      }}
      messages={{ complete: 'Activate claim' }}
      scrollToTop={false}
      showProgress="vertical"
      steps={steps}
      title="Claim products to Acme Workspace"
    />
  </Box>
);
