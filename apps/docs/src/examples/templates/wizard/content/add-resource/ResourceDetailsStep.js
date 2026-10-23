// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  List,
  ResponsiveContext,
  Text,
  TextInput,
} from 'grommet';
import { Trash } from '@hpe-design/icons-grommet';
import { Selector, SelectorGroup } from '@shared/aries-core';
import { WizardContext } from '../../components';
import { FormSection } from './FormSection';
import { deploymentModels, resourceTypes } from './data';

const defaultResource = { resourceId: '', clusterName: '' };

export const ResourceDetailsStep = () => {
  const size = useContext(ResponsiveContext);
  const { formValues, setFormValues, setValid } = useContext(WizardContext);
  const [resource, setResource] = useState(defaultResource);
  const mobile = ['xsmall', 'small'].includes(size);

  const setField = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
    setValid(true);
  };

  const addResource = () => {
    setField('resources', [
      ...formValues.resources,
      { id: resource.resourceId.trim(), location: resource.clusterName.trim() },
    ]);
    setResource(defaultResource);
  };

  const removeResource = id =>
    setField(
      'resources',
      formValues.resources.filter(item => item.id !== id),
    );

  return (
    <Box gap="large">
      <FormSection title="Choose resource type" gap="xsmall">
        <SelectorGroup
          a11yTitle="Resource type"
          value={formValues.resourceType}
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
          value={formValues.deploymentModel}
          onSelect={({ value }) => setField('deploymentModel', value)}
        >
          {deploymentModels.map(option => (
            <Selector key={option.value} {...option} />
          ))}
        </SelectorGroup>
        {/* The add-resource inputs are their own form so that "Add" (and
            pressing Enter) validates only these two fields. */}
        <Form
          value={resource}
          onChange={setResource}
          onSubmit={addResource}
          messages={{ required: 'This is a required field.' }}
        >
          <Box
            direction={mobile ? 'column' : 'row'}
            align={mobile ? 'stretch' : 'end'}
            gap="xsmall"
          >
            <Box flex>
              <FormField
                htmlFor="resourceId"
                name="resourceId"
                label="Resource ID"
                required
              >
                <TextInput
                  id="resourceId"
                  name="resourceId"
                  placeholder="RES-4A7B2C9D"
                />
              </FormField>
            </Box>
            <Box flex>
              <FormField
                htmlFor="clusterName"
                name="clusterName"
                label="Cluster name"
                required
              >
                <TextInput
                  id="clusterName"
                  name="clusterName"
                  placeholder="prod-us-east"
                />
              </FormField>
            </Box>
            {/* offset matches FormField content margin so the button
                aligns with the inputs */}
            <Box
              flex={false}
              margin={mobile ? undefined : { bottom: '3xsmall' }}
            >
              <Button label="Add" secondary type="submit" />
            </Box>
          </Box>
        </Form>
        <Box gap="xsmall">
          <Text size="small" id="added-resources-label">
            Added resources ({formValues.resources.length})
          </Text>
          <List
            aria-labelledby="added-resources-label"
            data={formValues.resources}
            border={{ side: 'bottom', color: 'border-weak' }}
            itemProps={{ [formValues.resources.length - 1]: { border: false } }}
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
