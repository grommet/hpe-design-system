// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, NameValueList, NameValuePair, Text, useWizard } from 'grommet';
import { FormSection } from './FormSection';
import { deploymentModels, getLabel, resourceTypes } from './data';

export const ReviewStep = () => {
  const { formValue } = useWizard();

  return (
    <Box gap="large">
      <FormSection title="Resource details">
        <NameValueList>
          <NameValuePair name="Resource type">
            {getLabel(resourceTypes, formValue.resourceType)}
          </NameValuePair>
          <NameValuePair name="Deployment model">
            {getLabel(deploymentModels, formValue.deploymentModel)}
          </NameValuePair>
          <NameValuePair name="Resources">
            <Box>
              {formValue.resources.map(resource => (
                <Text key={resource.id}>
                  {resource.id} · {resource.location}
                </Text>
              ))}
            </Box>
          </NameValuePair>
        </NameValueList>
      </FormSection>
      <FormSection title="Networking">
        <NameValueList>
          <NameValuePair name="Region">{formValue.region || '—'}</NameValuePair>
          <NameValuePair name="Network name">
            {formValue.networkName || 'Default network'}
          </NameValuePair>
          <NameValuePair name="Public access">
            {formValue.publicAccess ? 'Allowed' : 'Not allowed'}
          </NameValuePair>
          <NameValuePair name="Auto-scaling">
            {formValue.autoScaling ? 'Enabled' : 'Disabled'}
          </NameValuePair>
        </NameValueList>
      </FormSection>
    </Box>
  );
};
