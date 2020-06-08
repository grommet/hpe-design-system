import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Grid } from 'grommet';
import { Document, Expand, Grommet, Figma } from 'grommet-icons';

const ControlButton = ({ children, ...rest }) => (
  <Button plain {...rest}>
    {({ hover }) => (
      <Box
        direction="row"
        align="center"
        gap="small"
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        round="small"
        background={hover ? 'active-background' : undefined}
      >
        {children}
      </Box>
    )}
  </Button>
);

ControlButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
};

export const ExampleControls = ({ designer, docs, figma, setShowLayer }) => (
  <Box
    background="background-front"
    border={{
      side: 'top',
      color: 'background-back',
      size: 'xsmall',
    }}
    direction="row"
    align="start"
    justify="between"
    pad={{ horizontal: 'medium', vertical: 'small' }}
    round={{ corner: 'bottom', size: 'small' }}
  >
    <Grid
      columns={{ count: 'fill', size: ['small', 'auto'] }}
      alignSelf="center"
      justify="start"
      fill
      gap="xsmall"
    >
      {designer && (
        <Button
          href={designer}
          icon={<Grommet color="plain" />}
          label="Open in Grommet Designer"
          target="_blank"
        />
      )}
      {figma && (
        <Button
          href={figma}
          icon={<Figma color="plain" />}
          label="Open in Figma"
          target="_blank"
        />
      )}
      {docs && (
        <Button
          href={docs}
          icon={<Document />}
          label="Open docs"
          target="_blank"
        />
      )}
    </Grid>
    <Button
      icon={<Expand />}
      label="See Fullscreen"
      onClick={() => setShowLayer(true)}
    />
  </Box>
);

ExampleControls.propTypes = {
  designer: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
  setShowLayer: PropTypes.func,
};
