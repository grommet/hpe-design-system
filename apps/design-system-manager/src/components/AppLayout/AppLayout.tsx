import { Grid } from 'grommet';
import { AppHeader } from './AppHeader.tsx';
import { AppNav } from './AppNav.tsx';
import { AppBody } from './AppBody.tsx';

const gridAreas = [
  ['nav', 'header', 'context'],
  ['nav', 'body', 'context'],
];

const gridColumns = ['auto', 'flex', 'auto'];
const gridRows = ['auto', 'flex', 'auto'];

export const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Grid
      areas={gridAreas}
      columns={gridColumns}
      rows={gridRows}
      height={{ min: '100vh' }}
      width={{ max: '100vw' }}
    >
      <AppHeader gridArea="header" />
      <AppNav gridArea="nav" />
      <AppBody gridArea="body">{children}</AppBody>
    </Grid>
  );
};
