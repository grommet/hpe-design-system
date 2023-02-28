import React from 'react';
import { Box, Button, Grid, Text } from 'grommet';

export const ButtonExample = () => (
  <Grid
    columns={{ count: 'fit', size: 'small' }}
    rows="auto"
    gap="small"
    // align="start"
    justify="start"
  >
    <Button label="Button" onClick={() => {}} />
    <Button label="Primary" onClick={() => {}} primary />
    <Button label="Secondary" onClick={() => {}} secondary />
    <Button label="Toolbar" onClick={() => {}} kind="toolbar" />
    <Button label="CTA primary" onClick={() => {}} kind="cta-primary" />
    <Button label="CTA alternate" onClick={() => {}} kind="cta-alternate" />
    <Button label="colorProp" onClick={() => {}} color="blue" />
    <Button onClick={() => {}}>
      <Box>
        <Text>custom button</Text>
      </Box>
    </Button>
    <Button label="plainProp" onClick={() => {}} plain />
    <Button
      label="styleProp"
      onClick={() => {}}
      style={{ backgroundColor: 'magenta' }}
    />
  </Grid>
);
