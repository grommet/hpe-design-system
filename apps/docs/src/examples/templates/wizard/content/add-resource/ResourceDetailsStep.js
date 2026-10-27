// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useRef, useState } from 'react';
import {
  Box,
  Button,
  FormField,
  List,
  ResponsiveContext,
  Text,
  TextInput,
  useWizard,
} from 'grommet';
import { Trash } from '@hpe-design/icons-grommet';
import { Selector, SelectorGroup } from '@shared/aries-core';
import { FormSection } from './FormSection';
import { deploymentModels, resourceTypes } from './data';

const defaultResource = { resourceId: '', clusterName: '' };
const requiredMessages = {
  resourceId: 'Enter a resource ID.',
  clusterName: 'Enter a cluster name.',
};

export const ResourceDetailsStep = () => {
  const size = useContext(ResponsiveContext);
  const { formValue, setFormValue } = useWizard();
  const [resource, setResource] = useState(defaultResource);
  const [errors, setErrors] = useState({});
  const inputRefs = { resourceId: useRef(), clusterName: useRef() };
  const mobile = ['xsmall', 'small'].includes(size);

  const setField = (field, value) =>
    setFormValue(prev => ({ ...prev, [field]: value }));

  const updateResource = (field, value) => {
    setResource({ ...resource, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  // Per design system guidance the Add button stays enabled; missing input
  // is reported on click by marking the empty fields and focusing the first.
  const addResource = () => {
    const resourceId = resource.resourceId.trim();
    const clusterName = resource.clusterName.trim();
    const nextErrors = {};
    if (!resourceId) nextErrors.resourceId = requiredMessages.resourceId;
    if (!clusterName) nextErrors.clusterName = requiredMessages.clusterName;
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      const first = Object.keys(nextErrors)[0];
      inputRefs[first].current?.focus();
      return;
    }
    setField('resources', [
      ...formValue.resources,
      { id: resourceId, location: clusterName },
    ]);
    setResource(defaultResource);
    setErrors({});
  };

  const removeResource = id =>
    setField(
      'resources',
      formValue.resources.filter(item => item.id !== id),
    );

  // Wizard already wraps the step in a Form, so this draft is kept out of
  // the form value (no `name` props) and Enter adds the resource instead
  // of submitting the step.
  const onKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addResource();
    }
  };

  return (
    <Box gap="large">
      <FormSection title="Choose resource type" gap="xsmall">
        <SelectorGroup
          a11yTitle="Resource type"
          value={formValue.resourceType}
          onSelect={({ value }) => setField('resourceType', value)}
        >
          {resourceTypes.map(option => (
            <Selector key={option.value} {...option} />
          ))}
        </SelectorGroup>
      </FormSection>
      <FormSection title="Select the deployment model">
        <SelectorGroup
          a11yTitle="Deployment model"
          value={formValue.deploymentModel}
          onSelect={({ value }) => setField('deploymentModel', value)}
        >
          {deploymentModels.map(option => (
            <Selector key={option.value} {...option} />
          ))}
        </SelectorGroup>
        <Box
          direction={mobile ? 'column' : 'row'}
          align={mobile ? 'stretch' : 'start'}
          gap="xsmall"
          onKeyDown={onKeyDown}
        >
          <Box flex>
            {/* eslint-disable-next-line grommet/formfield-name */}
            <FormField
              htmlFor="resourceId"
              label="Resource ID"
              error={errors.resourceId}
            >
              <TextInput
                ref={inputRefs.resourceId}
                id="resourceId"
                value={resource.resourceId}
                onChange={event =>
                  updateResource('resourceId', event.target.value)
                }
                placeholder="RES-4A7B2C9D"
              />
            </FormField>
          </Box>
          <Box flex>
            {/* eslint-disable-next-line grommet/formfield-name */}
            <FormField
              htmlFor="clusterName"
              label="Cluster name"
              error={errors.clusterName}
            >
              <TextInput
                ref={inputRefs.clusterName}
                id="clusterName"
                value={resource.clusterName}
                onChange={event =>
                  updateResource('clusterName', event.target.value)
                }
                placeholder="prod-us-east"
              />
            </FormField>
          </Box>
          {/* Offset by the FormField label block (label margin + xsmall
              text line + content margin) so the button stays aligned with
              the inputs even when an error message renders beneath them */}
          <Box flex={false} margin={mobile ? undefined : { top: '28px' }}>
            <Button label="Add" secondary onClick={addResource} />
          </Box>
        </Box>
        <Box gap="xsmall">
          <Text size="small" id="added-resources-label">
            Added resources ({formValue.resources.length})
          </Text>
          <List
            aria-labelledby="added-resources-label"
            data={formValue.resources}
            border={{ side: 'bottom', color: 'border-weak' }}
            itemProps={{ [formValue.resources.length - 1]: { border: false } }}
            pad={{ horizontal: 'none', vertical: 'xsmall' }}
            action={(item, index) => (
              <Button
                key={index}
                a11yTitle={`Remove ${item.id}`}
                icon={<Trash />}
                onClick={() => removeResource(item.id)}
              />
            )}
          >
            {item => (
              <Box>
                <Text weight={500}>{item.id}</Text>
                <Text>{item.location}</Text>
              </Box>
            )}
          </List>
        </Box>
      </FormSection>
    </Box>
  );
};
