import { Grid, Text } from 'grommet';
import { ContentArea } from '../page-layouts/anatomy/components';

const numberOfColumns = 4;

export const NumberColumns = () => (
  <Grid columns={{ count: numberOfColumns, size: 'xsmall' }} height="small">
    {new Array(numberOfColumns).fill().map((_, index) => (
      <GridContentArea key={index} label={index} />
    ))}
  </Grid>
);

const GridContentArea = ({ label }) => (
  <ContentArea
    align="center"
    border
    background="validation-warning"
    justify="center"
  >
    <Text weight="bold">{label}</Text>
  </ContentArea>
);
