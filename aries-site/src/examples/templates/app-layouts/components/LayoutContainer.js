// LayoutContainer is designed to be a convenient way to access
// layout components whose concerns are specifically to control
// and organize its children content, how they ordered, spaced,
// and behave in various responsive contexts.
import { useEffect, useState } from 'react';
import { Box, Grid } from 'grommet';

export const LayoutContainer = ({ children, columns, gap, ...rest }) => {
  const [areas, setAreas] = useState([]);
  const [layoutContext, setLayoutContext] = useState();

  // Determine layout context
  useEffect(() => {
    const context = columns && columns.length > 1 ? 'grid' : 'box';
    setLayoutContext(context);
  }, [columns]);

  // Generate gridAreas
  useEffect(() => {
    if (layoutContext === 'grid') {
      const nextAreas = [];
      columns.forEach((item, index) => {
        nextAreas.push([`col${index + 1}`]);
      });
      setAreas(nextAreas);
    }
  }, [columns, layoutContext]);

  const layout =
    layoutContext === 'grid' ? (
      <Box {...rest}>
        <Grid areas={areas} columns={columns} rows={['auto']} gap={gap}>
          {children}
        </Grid>
      </Box>
    ) : (
      <Box gap={gap} {...rest}>
        {children}
      </Box>
    );
  return layout;
};
