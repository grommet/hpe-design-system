import React, { useState } from 'react';
import {
  Box,
  CheckBox,
  Collapsible,
  FormField,
  Text,
  TextInput,
} from 'grommet';

export const CheckBoxControllingContentVisibilityExample = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <Box pad="medium" width="medium" gap="medium">
      <Text weight="bold">Cluster configuration</Text>
      <FormField
        name="cluster-name"
        label="Cluster name"
        htmlFor="cluster-name"
      >
        <TextInput
          id="cluster-name"
          name="cluster-name"
          placeholder="my-cluster"
        />
      </FormField>
      <CheckBox
        id="advanced"
        name="advanced"
        label="Show advanced options"
        checked={showAdvanced}
        onChange={e => setShowAdvanced(e.target.checked)}
        pad="none"
      />
      <Collapsible open={showAdvanced}>
        <Box gap="small">
          <FormField
            name="timeout"
            label="Timeout (seconds)"
            htmlFor="timeout"
          >
            <TextInput
              id="timeout"
              name="timeout"
              type="number"
              placeholder="30"
            />
          </FormField>
          <FormField
            name="replicas"
            label="Replica count"
            htmlFor="replicas"
          >
            <TextInput
              id="replicas"
              name="replicas"
              type="number"
              placeholder="3"
            />
          </FormField>
        </Box>
      </Collapsible>
    </Box>
  );
};
