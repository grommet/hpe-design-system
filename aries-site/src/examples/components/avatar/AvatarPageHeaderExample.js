import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Avatar, Box, Button, PageHeader } from 'grommet';

export const AvatarPageHeaderExample = () => {
  const theme = useContext(ThemeContext);
  return (
    <Box align="start" gap="medium" direction="row">
      <Box pad={{ top: theme.pageHeader.pad.top }}>
        <Avatar
          flex={false}
          size="large"
          src="//s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80"
        />
      </Box>
      <PageHeader
        title="Account details"
        subtitle="View your account’s general information"
        actions={<Button secondary label="Edit" />}
      />
    </Box>
  );
};
