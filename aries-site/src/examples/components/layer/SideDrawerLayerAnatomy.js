import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardBody, Diagram, Grid, Stack } from 'grommet';
import { LayerHeader } from 'aries-core';
import { ThemeContext } from 'styled-components';
import { Annotation } from '../../../layouts';
import { connection, useDarkMode } from '../../../utils';

export const SideDrawerLayerAnatomy = ({ informational }) => {
  const theme = useContext(ThemeContext);
  const darkMode = useDarkMode();

  const closeId = informational ? 'informational-close' : 'actionable-close';
  const annotationId = informational
    ? 'informational-annotation'
    : 'actionable-annotation';

  const connections = [
    connection(annotationId, closeId),
    connection('2', 'layer-actions'),
  ];

  let rows = ['auto', '36px', '48px', '24px', 'medium', '24px', '36px', '24px'];
  let areas = [
    ['null', 'empty-1', 'layer'],
    ['null', 'annotation-1', 'layer'],
    ['null', 'empty-2', 'layer'],
    ['null', 'empty-2', 'layer'],
    ['null', 'empty-2', 'layer'],
    ['null', 'empty-2', 'layer'],
    ['null', 'annotation-2', 'layer'],
    ['null', 'empty-4', 'layer'],
  ];

  if (informational) {
    rows = rows.slice(0, 6);
    areas = areas.slice(0, 6);
  }

  return (
    <Stack interactiveChild="first">
      <Box
        background={{
          color: theme.layer.overlay.background,
          dark: !!darkMode.value,
        }}
        fill="horizontal"
      >
        <Grid
          align="center"
          columns={['flex', 'auto', 'medium']}
          rows={rows}
          areas={areas}
          gap={{ column: 'medium' }}
        >
          <Annotation
            alignSelf="center"
            id={annotationId}
            target="1"
            gridArea="annotation-1"
          />
          {!informational ? (
            <Annotation
              alignSelf="center"
              id="2"
              target="2"
              gridArea="annotation-2"
            />
          ) : null}
          <LayerContent
            gridArea="layer"
            closeId={closeId}
            informational={informational}
          />
        </Grid>
      </Box>
      <Diagram connections={connections} />
    </Stack>
  );
};

SideDrawerLayerAnatomy.propTypes = {
  informational: PropTypes.bool,
};

const LayerContent = ({ closeId, informational, ...rest }) => (
  <Card
    id="layer-container"
    alignSelf="start"
    elevation="large"
    round={{
      size: 'medium',
      corner: 'left',
    }}
    {...rest}
  >
    <CardBody gap="medium">
      <Box direction="row" align="start" gap="xsmall" flex={false}>
        <LayerHeader
          onClose={() => {}}
          subtitle="An optional, concise subtitle for added context."
          closeId={closeId}
        />
      </Box>
      <Box
        id="layer-body"
        border={{ style: 'dashed' }}
        height="medium"
        align="center"
        justify="center"
      >
        Layer body content goes here.
      </Box>
      {!informational ? (
        <Box direction="row" gap="xsmall" flex={false}>
          <Button label="Confirm action" primary />
          <Button label="Cancel" id="layer-actions" />
        </Box>
      ) : null}
    </CardBody>
  </Card>
);

LayerContent.propTypes = {
  closeId: PropTypes.string,
  informational: PropTypes.bool,
};
