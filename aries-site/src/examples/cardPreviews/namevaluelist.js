import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';

export const NameValueListPreview = () => (
  <Box width="medium" round="xsmall">
    <NameValueList nameProps={{ width: 'xsmall' }}>
      <NameValuePair name="Created On">
        <Text color="text-strong">13/02/2021 at 14:23:32</Text>
      </NameValuePair>
      <NameValuePair name="Description">
        <Text color="text-strong">
          Privilege escalation, such as via set-user-ID or set-group-ID file
          mode, should not be allowed.
        </Text>
      </NameValuePair>
    </NameValueList>
  </Box>
);
