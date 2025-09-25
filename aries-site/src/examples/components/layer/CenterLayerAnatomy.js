import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Diagram, Grid, ResponsiveContext, Stack } from 'grommet';
import { LayerHeader } from 'aries-core';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils';
import { LayerContainer } from './components/LayerContainer';

export const CenterLayerAnatomy = ({ informational }) => {
  const breakpoint = useContext(ResponsiveContext);
  const id = informational ? 'info-annotation' : 'action-annnotation';
  const connections = [
    connection(id, informational ? 'layer-close-button' : 'layer-actions'),
  ];

  let rows = ['24px', '37px', '24px', '24px', 'xsmall', '24px'];
  if (!informational) {
    rows = [...rows, '36px', '24px'];
  }
  return (
    <Stack interactiveChild="first">
      <Grid
        align="center"
        columns={[
          ['xsmall', 'small'].includes(breakpoint) ? 'flex' : 'medium',
          'auto',
        ]}
        rows={rows}
        areas={[
          ['layer', 'empty-1'],
          ['layer', 'annotation-close'],
          ['layer', 'empty-2'],
          ['layer', 'empty-2'],
          ['layer', 'empty-2'],
          ['layer', 'empty-2'],
          ['layer', 'annotation-actions'],
          ['layer', 'empty-3'],
        ]}
        gap={{ column: 'medium' }}
      >
        <Annotation
          alignSelf="center"
          id={id}
          target="1"
          gridArea={informational ? 'annotation-close' : 'annotation-actions'}
        />
        <LayerContent gridArea="layer" informational={informational} />
      </Grid>
      <Diagram connections={connections} />
    </Stack>
  );
};

CenterLayerAnatomy.propTypes = {
  informational: PropTypes.bool,
};

const LayerContent = ({ informational, ...rest }) => (
  <LayerContainer {...rest}>
    <LayerHeader
      informational={informational}
      onClose={informational ? () => {} : undefined}
      closeId={informational ? 'layer-close-button' : undefined}
      subtitle="An optional, concise subtitle for added context."
    />
    <Box
      border={{ style: 'dashed' }}
      height="xsmall"
      align="center"
      justify="center"
    >
      Layer body content goes here.
    </Box>
    {!informational ? (
      <Box direction="row" gap="xsmall" justify="end" flex={false}>
        <Button label="Cancel" />
        <Button label="Confirm action" primary id="layer-actions" />
      </Box>
    ) : null}
  </LayerContainer>
);

LayerContent.propTypes = {
  informational: PropTypes.bool,
};
