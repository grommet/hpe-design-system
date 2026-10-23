// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { ResourceDetailsStep } from './ResourceDetailsStep';
import { NetworkingStep } from './NetworkingStep';
import { ReviewStep } from './ReviewStep';

export * from './data';
export * from './FormSection';

// Each step validates the shared wizard form values and returns an
// error message, or undefined when the step is complete.
export const steps = [
  {
    title: 'Configure resource details',
    description:
      'Choose a resource type and provide configuration details to ' +
      'register new resources in your hybrid cloud environment.',
    inputs: <ResourceDetailsStep />,
    validate: values => {
      if (!values.resourceType) return 'Choose a resource type to continue.';
      if (!values.deploymentModel)
        return 'Select a deployment model to continue.';
      if (!values.resources.length) return 'Add at least one resource.';
      return undefined;
    },
  },
  {
    title: 'Configure networking',
    description:
      'Choose where the resources will be hosted and how they connect to ' +
      'the rest of your environment.',
    inputs: <NetworkingStep />,
    validate: values =>
      values.region ? undefined : 'Select a region to continue.',
  },
  {
    title: 'Review and add',
    description:
      'Confirm the details below. You can go back to make changes before ' +
      'adding the resources.',
    inputs: <ReviewStep />,
  },
];
