import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Avatar, Box, Button, Sidebar } from 'grommet';
import { Clock, Apps, Terminal, Chat, StatusUnknown } from 'grommet-icons';

export function SidebarExample() {
  const theme = useContext(ThemeContext);
  return (
    <Sidebar
      background={{ color: !theme.dark ? 'background' : 'blue', dark: true }}
      pad="medium"
      flex={false}
      // height for demo purposes only, remove in production
      height="large"
    >
      <Avatar
        margin={{ bottom: 'medium' }}
        src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"
      />
      <Box flex="grow">
        <Button a11yTitle="Clock" icon={<Clock />} />
        <Button a11yTitle="Apps" icon={<Apps />} />
        <Button a11yTitle="Terminal" icon={<Terminal />} />
      </Box>
      <Box>
        <Button a11yTitle="Chat" icon={<Chat />} />
        <Button a11yTitle="Help" icon={<StatusUnknown />} />
      </Box>
    </Sidebar>
  );
}
