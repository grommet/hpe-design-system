// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { WizardContext } from '../../components';
import { FormSection } from './FormSection';
import { deploymentModels, getLabel, resourceTypes } from './data';

export const ReviewStep = () => {
  const { formValues } = useContext(WizardContext);

  return (
    <Box gap="large">
      <FormSection title="Resource details">
        <NameValueList>
          <NameValuePair name="Resource type">
            {getLabel(resourceTypes, formValues.resourceType)}
          </NameValuePair>
          <NameValuePair name="Deployment model">
            {getLabel(deploymentModels, formValues.deploymentModel)}
          </NameValuePair>
          <NameValuePair name="Resources">
            <Box>
              {formValues.resources.map(resource => (
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
          <NameValuePair name="Region">
            {formValues.region || '—'}
          </NameValuePair>
          <NameValuePair name="Network name">
            {formValues.networkName || 'Default network'}
          </NameValuePair>
          <NameValuePair name="Public access">
            {formValues.publicAccess ? 'Allowed' : 'Not allowed'}
          </NameValuePair>
          <NameValuePair name="Auto-scaling">
            {formValues.autoScaling ? 'Enabled' : 'Disabled'}
          </NameValuePair>
        </NameValueList>
      </FormSection>
    </Box>
  );
};
