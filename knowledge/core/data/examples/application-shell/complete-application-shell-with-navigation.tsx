// AppShell.tsx
import { Grid, Box, Header, Main, Button, Text, Heading } from 'grommet';
import { Close } from '@hpe-design/icons-grommet';

const gridAreas = [
  ['nav', 'header', 'header'],
  ['nav', 'main', 'context-pane'],
];

export const AppShell = ({
  navigationMenu,
  mainContent,
  contextContent,
  setContextContent
}) => {
  const mainRound = contextContent
    ? { corner: 'top', size: 'small' }
    : { corner: 'top-left', size: 'small' };

  return (
    <Grid
      areas={gridAreas}
      columns={['auto', 'flex', 'auto']}
      rows={['auto', 'flex']}
      height="100vh"
    >
      <Box
        gridArea="nav"
        as="aside"
        aria-label="navigation"
        background="background-front"
      >
        {navigationMenu}
      </Box>
      <Header
        gridArea="header"
        pad={{ horizontal: 'medium', vertical: '3xsmall' }}
      >
        <Button plain>
          <Text weight="bold">My App</Text>
        </Button>
      </Header>
      <Main gridArea="main" background="background-back" round={mainRound}>
        {mainContent}
      </Main>
      {contextContent && (
        <Box
          gridArea="context-pane"
          as="aside"
          background="background-front"
          width={{ min: 'small' }}
        >
          <Header pad={{ vertical: '3xsmall', left: 'medium', right: 'xsmall' }}>
            <Heading level={2} size="small" margin="none">
              {contextContent}
            </Heading>
            <Button
              icon={<Close />}
              onClick={() => setContextContent('')}
              size="small"
            />
          </Header>
          <Box pad={{ horizontal: 'medium' }}>
            {/* Context content goes here */}
          </Box>
        </Box>
      )}
    </Grid>
  );
};