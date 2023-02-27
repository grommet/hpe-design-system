import React from 'react';
import { Box, Grid, Text } from 'grommet';

const AuditBox = ({ ...rest }) => {
  return (
    <Box align="center" justify="center" pad="medium" round="small" {...rest} />
  );
};

export const BoxExample = () => (
  <Grid columns={{ size: 'small', count: 'fit' }} rows="small" gap="small">
    <AuditBox border={{ color: 'green', size: 'medium' }}>
      <Text>border.color 'green'</Text>
    </AuditBox>
    <AuditBox
      border={{
        color: { light: 'purple', dark: 'teal' },
      }}
    >
      <Text>border.color 'light: 'purple', dark: 'teal'</Text>
    </AuditBox>
    <AuditBox
      border={{
        color: { light: 'rebeccapurple', dark: 'teal' },
      }}
    >
      <Text>border.color 'light: 'rebeccapurple', dark: 'teal'</Text>
    </AuditBox>
    <AuditBox border="lightgrey">
      <Text>border 'lightgrey'</Text>
    </AuditBox>
    <AuditBox border={{ color: 'gray', size: 'medium' }}>
      <Text>border.color 'gray'</Text>
    </AuditBox>
    <AuditBox border={{ size: 'medium' }}>
      <Text>border object, no color</Text>
    </AuditBox>
    <AuditBox border={{ size: 'medium' }}>
      <Text>border object, no color</Text>
    </AuditBox>
    <AuditBox background="purple-blue-yellow">
      <Text>background 'purple-blue-yellow'</Text>
    </AuditBox>
    <AuditBox background="background-contrast">
      <Text>background 'background-contrast'</Text>
    </AuditBox>
    <AuditBox background="lightgrey">
      <Text>background non-design token</Text>
    </AuditBox>
    <AuditBox background="url(https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80)">
      <Text>background image</Text>
    </AuditBox>
    <AuditBox background={{ dark: 'teal', light: 'yellow' }}>
      <Text>background dark/light object</Text>
    </AuditBox>
    <AuditBox background={{ dark: 'teal', light: 'salmon' }}>
      <Text>background dark/light object non-design token</Text>
    </AuditBox>
    <AuditBox background={{ color: { dark: 'teal', light: 'orange' } }}>
      <Text>background.color dark/light object</Text>
    </AuditBox>
    <AuditBox background={{ color: { dark: 'teal', light: 'salmon' } }}>
      <Text>background.color dark/light object non-design token</Text>
    </AuditBox>
    <AuditBox background={{ color: 'orange' }}>
      <Text>background.color</Text>
    </AuditBox>
    <AuditBox background={{ color: 'salmon' }}>
      <Text>background.color non-design token</Text>
    </AuditBox>
    <AuditBox
      background={{
        image:
          'url(https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80)',
      }}
    >
      <Text>background.image</Text>
    </AuditBox>
    <AuditBox background={{ image: 'orange-yellow', rotate: 90 }}>
      <Text>background.image</Text>
    </AuditBox>
    <AuditBox style={{ backgroundColor: 'black' }}>
      <Text>styleProp</Text>
    </AuditBox>
  </Grid>
);
