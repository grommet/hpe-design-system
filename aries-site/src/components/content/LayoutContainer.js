// LayoutContainer is designed to be a convenient way to access
// layout components whose concerns are specifically to control
// and organize its children content, how they ordered, spaced,
// and behave in various responsive contexts.

import { Box, Grid } from 'grommet';

export const LayoutContainer = ({ columns, ...rest }) => {
  const type =
    columns.length >= 2 ? (
      <Grid columns={columns} {...rest} />
    ) : (
      <Box {...rest} />
    );
  return type;
};
