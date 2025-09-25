import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Diagram, Grid, Page, PageContent, Stack } from 'grommet';
import { LayerHeader } from 'aries-core';
import { Close } from 'grommet-icons';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils';

export const FullscreenLayerAnatomy = ({ informational }) => {
  const closeId = informational
    ? 'informational-close-button'
    : 'actionable-close-buttonn';

  const connections = [
    connection(informational ? 'info-1' : 'actionable-1', closeId),
    connection('2', 'layer-actions'),
  ];

  let rows = ['36px', '36px', 'auto', '36px', '24px'];
  if (informational) {
    rows = rows.slice(0, 6);
  }

  return (
    <Stack interactiveChild="first">
      <Grid
        align="center"
        columns={['flex', 'auto']}
        rows={rows}
        areas={[
          ['layer', 'empty-1'],
          ['layer', 'annotation-1'],
          ['layer', 'empty-2'],
          ['layer', 'annotation-2'],
          ['layer', 'empty-3'],
        ]}
        gap={{ column: 'medium' }}
      >
        <Annotation
          alignSelf="center"
          id={informational ? 'info-1' : 'actionable-1'}
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
      <Diagram connections={connections} />
    </Stack>
  );
};

FullscreenLayerAnatomy.propTypes = {
  informational: PropTypes.bool,
};

const LayerContent = ({ closeId, informational, ...rest }) => (
  <Box {...rest}>
    <Box
      direction="row"
      flex={false}
      gap="3xsmall"
      /* This Box represents a header of a browser application window. 
            The selected background color provides better contrast between the 
            header and the examples being showcased. */
      background={{ color: 'border-weak' }}
      align="center"
      pad="xsmall"
    >
      <Box round pad="3xsmall" background="red" />
      <Box round pad="3xsmall" background="yellow" />
      <Box round pad="3xsmall" background="green" />
    </Box>
    <Page background="background-front" id="layer-container">
      <Button alignSelf="end" a11yTitle="Close" icon={<Close />} id={closeId} />
      <PageContent
        gap="medium"
        pad={{ horizontal: 'medium', bottom: 'medium' }}
      >
        <LayerHeader />
        <Box
          border={{ style: 'dashed' }}
          height="xsmall"
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
      </PageContent>
    </Page>
  </Box>
);

LayerContent.propTypes = {
  closeId: PropTypes.string,
  informational: PropTypes.bool,
};
