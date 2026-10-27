// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { ResourceDetailsStep } from './ResourceDetailsStep';
import { NetworkingStep } from './NetworkingStep';
import { ReviewStep } from './ReviewStep';

export * from './data';
export * from './FormSection';

// Wizard wraps each step in a Form, so FormField `required` rules are
// validated automatically. `validate` covers inputs that are not form
// fields; returning a string blocks navigation and shows the message.
export const steps = [
  {
    id: 'resource-details',
    title: 'Configure resource details',
    description:
      'Choose a resource type and provide configuration details to ' +
      'register new resources in your hybrid cloud environment.',
    render: () => <ResourceDetailsStep />,
    validate: value => {
      if (!value.resourceType) return 'Choose a resource type to continue.';
      if (!value.deploymentModel)
        return 'Select a deployment model to continue.';
      if (!value.resources.length) return 'Add at least one resource.';
      return true;
    },
  },
  {
    id: 'networking',
    title: 'Configure networking',
    description:
      'Choose where the resources will be hosted and how they connect to ' +
      'the rest of your environment.',
    render: () => <NetworkingStep />,
  },
  {
    id: 'review',
    title: 'Review and add',
    description:
      'Confirm the details below. You can go back to make changes before ' +
      'adding the resources.',
    render: () => <ReviewStep />,
  },
];
