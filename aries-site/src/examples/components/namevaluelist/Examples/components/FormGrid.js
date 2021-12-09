import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Grid, ResponsiveContext } from 'grommet';

// mimic NameValueList layout
export const FormGrid = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);

  return (
    <Grid
      columns={
        size !== 'small'
          ? [theme.nameValueList.name.width, theme.nameValueList.value.width]
          : { count: 'fit', size: ['auto', theme.nameValueList.value.width] }
      }
      // need to adjust gap to take the formfield margin into account
      gap={theme.nameValueList.pair.column.gap}
      {...rest}
    />
  );
};
