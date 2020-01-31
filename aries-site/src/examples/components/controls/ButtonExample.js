import React from 'react';
import { Box, Button } from 'grommet';
import { Next } from 'grommet-icons';

import { UsageExample } from '../../../layouts';

export const ButtonExample = () => {
  return (
    <UsageExample
      pad={{
        vertical: 'large',
        horizontal: 'large',
        small: { horizontal: 'large', top: 'medium', bottom: 'xlarge' },
      }}
      direction="column"
      align="start"
      gap="large"
      docs="https://v2.grommet.io/button?theme=hpe"
      code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/MenuExample.js"
      figma="https://www.figma.com/file/HZq1i3avh8VLK4kWXs38sW/grommet-hpe-form?node-id=0%3A1"
    >
      <Button
        label="Check it out!"
        icon={<Next />}
        reverse
        primary
        onClick={() => {}}
      />
      <Box direction="row" gap="medium">
        <Button type="submit" label="Submit" primary onClick={() => {}} />
        <Button type="reset" label="Reset" disabled onClick={() => {}} />
        <Button label="Cancel" onClick={() => {}} />
      </Box>
    </UsageExample>
  );
};
