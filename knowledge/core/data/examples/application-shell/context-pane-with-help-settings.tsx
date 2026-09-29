// ContextControls.tsx - Header buttons that open context pane
import { Box, Button } from 'grommet';
import { Help, User } from '@hpe-design/icons-grommet';

export const ContextControls = ({ contextContent, setContextContent }) => (
  <Box direction="row" gap="xsmall">
    <Button
      icon={<Help />}
      onClick={() => setContextContent(contextContent === 'help' ? '' : 'help')}
      active={contextContent === 'help'}
      tip="Help"
    />
    <Button
      icon={<User />}
      onClick={() => setContextContent(contextContent === 'user' ? '' : 'user')}
      active={contextContent === 'user'}
      tip="User Preferences"
    />
  </Box>
);