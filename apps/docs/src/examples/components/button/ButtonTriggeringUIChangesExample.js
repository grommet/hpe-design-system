import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapsible,
  NameValueList,
  NameValuePair,
  ResponsiveContext,
  Text,
} from 'grommet';
import { User } from '@hpe-design/icons-grommet';

export const ButtonTriggeringUIChangesExample = () => {
  const [open, setOpen] = useState(false);
  const size = React.useContext(ResponsiveContext);
  const small = ['xsmall', 'small'].includes(size);

  return (
    <Box pad="medium" gap="small" width={small ? '100%' : 'medium'}>
      <Box direction="row" align="center" justify="between">
        <Text weight="bold">Account</Text>
        <Button
          a11yTitle={open ? 'Hide account details' : 'Show account details'}
          icon={<User />}
          active={open}
          onClick={() => setOpen(prev => !prev)}
          tip={open ? 'Hide account details' : 'Show account details'}
        />
      </Box>
      <Collapsible open={open}>
        <NameValueList>
          <NameValuePair name="Name">Jane Smith</NameValuePair>
          <NameValuePair name="Role">Administrator</NameValuePair>
          <NameValuePair name="Status">Active</NameValuePair>
          <NameValuePair name="Email">jane.smith@example.com</NameValuePair>
          <NameValuePair name="Last login">Apr 14, 2026</NameValuePair>
        </NameValueList>
      </Collapsible>
    </Box>
  );
};
