// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  FormField,
  Grid,
  RadioButtonGroup,
  Select,
  Text,
  TextArea,
  TextInput,
} from 'grommet';

export const defaultValues = {
  subject: '',
  description: '',
  requestType: '',
  priority: '',
  followUp: '',
  phoneCountry: '',
  phoneNumber: '',
  phoneExtension: '',
  serialNumber: '',
  productSeries: 'C-Series',
  watchlist: '',
  productName: '',
  softwareVersion: '',
  environment: '',
};

export const steps = [
  { id: 'issue-details', title: 'Issue details' },
  { id: 'product-details', title: 'Product details' },
];

// Shows how many characters remain once the user nears the limit, and an
// error once they go over it. Same pattern as the character counter example.
const characterLimit =
  (max, threshold = 0.8) =>
  (value = '') => {
    if (value.length / max <= threshold) return undefined;
    const remaining = max - value.length;
    return remaining >= 0
      ? { status: 'info', message: `${remaining} characters left` }
      : {
          status: 'error',
          message: `${-remaining} character${
            remaining === -1 ? '' : 's'
          } over limit`,
        };
  };

// Every id is prefixed so that more than one wizard can render on a page
// without duplicate ids.
export const SubjectField = ({ idPrefix }) => (
  <FormField
    htmlFor={`${idPrefix}-subject`}
    label="Subject"
    name="subject"
    required
    validate={characterLimit(255)}
    validateOn="change"
  >
    <TextInput
      id={`${idPrefix}-subject`}
      name="subject"
      placeholder="Enter a title"
    />
  </FormField>
);

export const DescriptionField = ({ idPrefix }) => (
  <FormField
    htmlFor={`${idPrefix}-description`}
    label="Description"
    name="description"
    required
    validate={characterLimit(32000)}
    validateOn="change"
  >
    <TextArea
      id={`${idPrefix}-description`}
      name="description"
      placeholder="Describe the issue"
      resize="vertical"
    />
  </FormField>
);

export const RequestTypeField = ({ idPrefix }) => (
  <FormField
    htmlFor={`${idPrefix}-requestType`}
    label="Request type"
    name="requestType"
    required
  >
    <Select
      id={`${idPrefix}-requestType`}
      name="requestType"
      options={[
        'Configuration help',
        'Hardware issue',
        'Software issue',
        'Other',
      ]}
      placeholder="Select request type"
    />
  </FormField>
);

export const PriorityField = ({ idPrefix }) => (
  <FormField
    htmlFor={`${idPrefix}-priority`}
    label="Priority"
    name="priority"
    required
  >
    <Select
      id={`${idPrefix}-priority`}
      name="priority"
      options={['Low', 'Medium', 'High', 'Critical']}
      placeholder="Select priority"
    />
  </FormField>
);

// The phone fields share a single group label. Each input keeps its own
// visible label so that its purpose is clear when the three sit side by side.
export const FollowUpFields = ({ idPrefix, required }) => (
  <>
    <FormField
      htmlFor={`${idPrefix}-followUp`}
      label="Follow up method"
      name="followUp"
      required={required}
    >
      <RadioButtonGroup
        id={`${idPrefix}-followUp`}
        name="followUp"
        options={['Case update', 'Phone call']}
      />
    </FormField>
    <Box
      aria-labelledby={`${idPrefix}-phone-label`}
      gap="3xsmall"
      role="group"
    >
      <Text
        color="text-strong"
        id={`${idPrefix}-phone-label`}
        size="xsmall"
        weight={500}
      >
        Preferred call back telephone number
      </Text>
      <Grid columns={['flex', 'flex', 'flex']} gap="xsmall">
        <FormField
          htmlFor={`${idPrefix}-phoneCountry`}
          label="Country"
          name="phoneCountry"
        >
          <Select
            id={`${idPrefix}-phoneCountry`}
            name="phoneCountry"
            options={['US', 'CA', 'GB', 'DE', 'IN']}
          />
        </FormField>
        <FormField
          htmlFor={`${idPrefix}-phoneNumber`}
          label="Number"
          name="phoneNumber"
        >
          <TextInput
            id={`${idPrefix}-phoneNumber`}
            name="phoneNumber"
            type="tel"
          />
        </FormField>
        <FormField
          htmlFor={`${idPrefix}-phoneExtension`}
          label="Extension"
          name="phoneExtension"
        >
          <TextInput
            id={`${idPrefix}-phoneExtension`}
            name="phoneExtension"
            type="tel"
          />
        </FormField>
      </Grid>
    </Box>
  </>
);

export const SerialNumberField = ({ idPrefix }) => (
  <FormField
    htmlFor={`${idPrefix}-serialNumber`}
    label="Serial number, license ID or contract ID"
    name="serialNumber"
  >
    <TextInput id={`${idPrefix}-serialNumber`} name="serialNumber" />
  </FormField>
);

export const ProductSeriesField = ({ idPrefix }) => (
  <FormField
    htmlFor={`${idPrefix}-productSeries`}
    label="Product series"
    name="productSeries"
    required
  >
    <Select
      id={`${idPrefix}-productSeries`}
      name="productSeries"
      options={['A-Series', 'C-Series', 'S-Series']}
      placeholder="Select product series"
    />
  </FormField>
);

export const WatchlistField = ({ idPrefix, required }) => (
  <FormField
    help="Email addresses of people to notify about updates to this case."
    htmlFor={`${idPrefix}-watchlist`}
    label="Watchlist"
    name="watchlist"
    required={required}
    validate={characterLimit(32000)}
    validateOn="change"
  >
    <TextArea
      id={`${idPrefix}-watchlist`}
      name="watchlist"
      resize="vertical"
    />
  </FormField>
);

// Placeholder content for the second step.
export const ProductDetailsFields = ({ idPrefix }) => (
  <>
    <FormField
      htmlFor={`${idPrefix}-productName`}
      label="Product name"
      name="productName"
      required
    >
      <TextInput id={`${idPrefix}-productName`} name="productName" />
    </FormField>
    <FormField
      htmlFor={`${idPrefix}-softwareVersion`}
      label="Software version"
      name="softwareVersion"
    >
      <TextInput id={`${idPrefix}-softwareVersion`} name="softwareVersion" />
    </FormField>
    <FormField
      htmlFor={`${idPrefix}-environment`}
      label="Operating environment"
      name="environment"
    >
      <Select
        id={`${idPrefix}-environment`}
        name="environment"
        options={['Production', 'Staging', 'Development']}
        placeholder="Select environment"
      />
    </FormField>
  </>
);

const fieldPropTypes = { idPrefix: PropTypes.string.isRequired };
const requirableFieldPropTypes = {
  ...fieldPropTypes,
  required: PropTypes.bool,
};

SubjectField.propTypes = fieldPropTypes;
DescriptionField.propTypes = fieldPropTypes;
RequestTypeField.propTypes = fieldPropTypes;
PriorityField.propTypes = fieldPropTypes;
FollowUpFields.propTypes = requirableFieldPropTypes;
SerialNumberField.propTypes = fieldPropTypes;
ProductSeriesField.propTypes = fieldPropTypes;
WatchlistField.propTypes = requirableFieldPropTypes;
ProductDetailsFields.propTypes = fieldPropTypes;
