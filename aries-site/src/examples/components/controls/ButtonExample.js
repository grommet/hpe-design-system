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
      code="https://github.com/hpe-design/design-system/blob/master/aries-site/src/examples/components/controls/MenuExample.js"
      figma="https://github.com/hpe-design/design-system/blob/master/aries-site/src/examples/components/controls/MenuExample.js"
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
