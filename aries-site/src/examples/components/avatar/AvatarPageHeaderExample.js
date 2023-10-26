import React from 'react';
import { Avatar, Box, Button, PageHeader } from 'grommet';

export const AvatarPageHeaderExample = () => (
  <Box align="end" gap="medium" direction="row">
    <Avatar
      flex={false}
      size="large"
      src="//s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80"
    />
    <PageHeader
      title="Account details"
      subtitle="View your account’s general information"
      actions={<Button secondary label="Edit" />}
    />
  </Box>
);
