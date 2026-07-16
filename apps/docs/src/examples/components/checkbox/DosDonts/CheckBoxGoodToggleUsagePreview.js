import React, { useState } from 'react';
import { Box, CheckBox, Text } from 'grommet';

export const CheckBoxGoodToggleUsagePreview = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <Box width="medium" gap="small">
      <CheckBox
        id="dark-mode"
        name="dark-mode"
        label="Dark mode"
        checked={enabled}
        onChange={event =>
          setEnabled(event.target.checked)
        }
        toggle
        reverse
      />
      {enabled && (
        <Text size="small" color="status-ok">
          Dark mode enabled.
        </Text>
      )}
    </Box>
  );
};
