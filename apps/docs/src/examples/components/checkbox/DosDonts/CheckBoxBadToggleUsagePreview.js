import React, { useState } from 'react';
import { Box, Button, CheckBox, Form, FormField } from 'grommet';

// Anti-pattern: toggle inside a form submission
// workflow implies instant effect but requires submit.
export const CheckBoxBadToggleUsagePreview = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Box width="medium">
      <Form>
        {/* CheckBox label provides the accessible name; htmlFor on FormField
            would create a duplicate label, causing an a11y violation. */}
        {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
        <FormField name="notifications">
          <CheckBox
            name="notifications"
            id="notifications-bad"
            label="Enable notifications"
            checked={checked}
            onChange={event => setChecked(event.target.checked)}
            toggle
          />
        </FormField>
        <Box direction="row" margin={{ top: 'small' }}>
          <Button type="submit" primary label="Save" />
        </Box>
      </Form>
    </Box>
  );
};
