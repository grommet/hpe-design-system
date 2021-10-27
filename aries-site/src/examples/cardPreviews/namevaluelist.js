import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';

export const NameValueListPreview = () => (
  <Box width="medium" round="xsmall">
    <NameValueList>
      <NameValuePair name="Created On">
        13/02/2021 at 14:23:32
      </NameValuePair>
      <NameValuePair name="Description">
          Privilege escalation, such as via set-user-ID or set-group-ID file
          mode, should not be allowed.
      </NameValuePair>
    </NameValueList>
  </Box>
);
