import React, { useState } from 'react';
import {
  Box,
  CheckBox,
  Form,
  FormField,
  TextInput,
} from 'grommet';

export const CheckBoxShowingHidingContentExample = () => {
  const [advanced, setAdvanced] = useState(false);
  return (
    <Box width="medium">
      <Form>
        {/* CheckBox label provides the accessible name;
         htmlFor on FormField would create a duplicate
         label, causing an a11y violation. */}
        {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
        <FormField name="advanced-settings">
          <CheckBox
            name="advanced-settings"
            id="advanced-settings"
            label="Enable advanced settings"
            checked={advanced}
            onChange={event =>
              setAdvanced(event.target.checked)
            }
          />
        </FormField>
        {advanced && (
          <Box gap="small">
            <FormField
              label="Timeout (seconds)"
              name="timeout"
              htmlFor="timeout"
            >
              <TextInput
                id="timeout"
                name="timeout"
                placeholder="30"
              />
            </FormField>
            <FormField
              label="Retry limit"
              name="retry-limit"
              htmlFor="retry-limit"
            >
              <TextInput
                id="retry-limit"
                name="retry-limit"
                placeholder="3"
              />
            </FormField>
          </Box>
        )}
      </Form>
    </Box>
  );
};
