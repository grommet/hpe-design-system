import React from 'react';
import { Box, Button } from 'grommet';
import { Filter, FormEdit, Add, FormNextLink } from 'grommet-icons';

export const ButtonExample = () => (
  <Box direction="row" align="start" gap="medium" pad="medium">
    <Box align="start" gap="small">
      <Button label="Default (small)" size="small" />
      <Button label="Default" />
      <Button label="Default (large)" size="large" />
      <Button label="Default, active" active />
      <Button label="Default, disabled" disabled />
      <Button icon={<FormEdit />} />
      <Button icon={<Add />} size="large" />
    </Box>
    <Box align="start" gap="small">
      <Button label="Secondary (small)" secondary size="small" />
      <Button label="Secondary" secondary />
      <Button label="Secondary (large)" secondary size="large" />
      <Button label="Secondary, active" active secondary />
      <Button label="Secondary, disabled" disabled secondary />
      <Button icon={<FormEdit />} secondary />
      <Button icon={<Add />} secondary size="large" />
    </Box>
    <Box align="start" gap="small">
      <Button
        label="Secondary (small)"
        secondary
        size="small"
        icon={<FormNextLink color="green!" />}
        reverse
      />
      <Button
        label="Secondary"
        secondary
        icon={<FormNextLink color="green!" />}
        reverse
      />
      <Button
        label="Secondary (large)"
        secondary
        size="large"
        icon={<FormNextLink color="green!" />}
        reverse
      />
    </Box>
    <Box align="start" gap="small">
      <Button label="Primary (small)" size="small" primary />
      <Button label="Primary" primary />
      <Button label="Primary (large)" size="large" primary />
      <Button label="Primary, active" active primary />
      <Button label="Primary, disabled" disabled primary />
      <Button icon={<FormEdit />} primary />
      <Button icon={<Add />} primary size="large" />
    </Box>
    <Box align="start" gap="small">
      <Button
        label="Primary (small)"
        primary
        size="small"
        icon={<FormNextLink color="text-primary-button" />}
        reverse
      />
      <Button
        label="Primary"
        primary
        icon={<FormNextLink color="text-primary-button" />}
        reverse
      />
      <Button
        label="Primary (large)"
        primary
        size="large"
        icon={<FormNextLink color="text-primary-button" />}
        reverse
      />
    </Box>
    <Box align="start" gap="small">
      <Button label="CTA primary (small)" size="small" kind="cta-primary" />
      <Button label="CTA primary" kind="cta-primary" />
      <Button label="CTA primary (large)" size="large" kind="cta-primary" />
      <Button label="CTA primary, active" active kind="cta-primary" />
      <Button label="CTA primary, disabled" disabled kind="cta-primary" />
    </Box>
    <Box align="start" gap="small">
      <Button label="CTA alternate (small)" size="small" kind="cta-alternate" />
      <Button label="CTA alternate" kind="cta-alternate" />
      <Button label="CTA alternate (large)" size="large" kind="cta-alternate" />
      <Button label="CTA alternate, active" active kind="cta-alternate" />
      <Button label="CTA alternate, disabled" disabled kind="cta-alternate" />
    </Box>
    <Box align="start" gap="small">
      <Button label="Toolbar" kind="toolbar" />
      <Button label="Toolbar, active" active kind="toolbar" />
      <Button label="Toolbar, disabled" disabled kind="toolbar" />
      <Button icon={<Filter />} kind="toolbar" />
    </Box>
  </Box>
);
