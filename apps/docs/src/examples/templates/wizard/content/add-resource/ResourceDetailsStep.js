// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useState } from 'react';
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

export const ResourceDetailsStep = () => {
  const size = useContext(ResponsiveContext);
  const { formValue, setFormValue } = useWizard();
  const [resource, setResource] = useState(defaultResource);
  const mobile = ['xsmall', 'small'].includes(size);

  const setField = (field, value) =>
    setFormValue(prev => ({ ...prev, [field]: value }));

  const resourceId = resource.resourceId.trim();
  const clusterName = resource.clusterName.trim();
  const canAdd = resourceId && clusterName;

  const addResource = () => {
    if (!canAdd) return;
    setField('resources', [
      ...formValue.resources,
      { id: resourceId, location: clusterName },
    ]);
    setResource(defaultResource);
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
          align={mobile ? 'stretch' : 'end'}
          gap="xsmall"
          onKeyDown={onKeyDown}
        >
          <Box flex>
            {/* eslint-disable-next-line grommet/formfield-name */}
            <FormField htmlFor="resourceId" label="Resource ID">
              <TextInput
                id="resourceId"
                value={resource.resourceId}
                onChange={event =>
                  setResource({ ...resource, resourceId: event.target.value })
                }
                placeholder="RES-4A7B2C9D"
              />
            </FormField>
          </Box>
          <Box flex>
            {/* eslint-disable-next-line grommet/formfield-name */}
            <FormField htmlFor="clusterName" label="Cluster name">
              <TextInput
                id="clusterName"
                value={resource.clusterName}
                onChange={event =>
                  setResource({ ...resource, clusterName: event.target.value })
                }
                placeholder="prod-us-east"
              />
            </FormField>
          </Box>
          {/* offset matches FormField content margin so the button
              aligns with the inputs */}
          <Box flex={false} margin={mobile ? undefined : { bottom: '3xsmall' }}>
            <Button
              label="Add"
              secondary
              disabled={!canAdd}
              onClick={addResource}
            />
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
