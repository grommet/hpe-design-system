import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Diagram,
  Footer,
  Grid,
  Stack,
} from 'grommet';
import { LayerHeader } from '@shared/aries-core';
import { Annotation } from '../../../layouts';

const color = 'border';
const thickness = 'hair';
const type = 'direct';

const connections = [
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '1',
    toTarget: 'layer-header',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '1a',
    toTarget: 'layer-title',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '1b',
    toTarget: 'layer-subtitle',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '1c',
    toTarget: 'layer-close',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'layer-body',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '3',
    toTarget: 'layer-footer',
  },
  {
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '3a',
    toTarget: 'layer-confirm',
  },
  {
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '3b',
    toTarget: 'layer-cancel',
  },
];

const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['5xsmall', 'medium', '3xsmall']}
    rows={[
      '5xsmall',
      'flex',
      'flex',
      'flex',
      'flex',
      'flex',
      'flex',
      '5xsmall',
    ]}
    areas={[
      ['annotation-1a', 'layer-area', 'annotation-1c'],
      ['annotation-1b', 'layer-area', 'annotation-1'],
      ['empty-0', 'layer-area', 'empty-1'],
      ['empty-2', 'layer-area', 'annotation-2'],
      ['empty-3', 'layer-area', 'empty-4'],
      ['empty-5', 'layer-area', 'annotation-3'],
      ['empty-6', 'layer-area', 'empty-7'],
      ['empty-8', 'annotation-3b', 'annotation-3a'],
    ]}
    align="center"
    justify="center"
    columnGap="large"
    {...rest}
  />
);

export const LayerAnatomy = () => {
  const annotations = [
    { id: '1', gridArea: 'annotation-1', target: '1' },
    { id: '1a', gridArea: 'annotation-1a', target: '1a' },
    { id: '1b', gridArea: 'annotation-1b', target: '1b' },
    { id: '1c', gridArea: 'annotation-1c', target: '1c' },
    { id: '2', gridArea: 'annotation-2', target: '2' },
    { id: '3', gridArea: 'annotation-3', target: '3' },
    { id: '3a', gridArea: 'annotation-3a', target: '3a' },
    { id: '3b', gridArea: 'annotation-3b', target: '3b' },
  ];

  return (
    <Stack margin={{ bottom: 'medium' }} interactiveChild="last">
      <AnatomyGrid>
        {annotations.map(({ id, gridArea, target, ...rest }) => (
          <Annotation
            key={id}
            id={id}
            target={target}
            gridArea={gridArea}
            {...rest}
          />
        ))}

        <Card
          gridArea="layer-area"
          background="background-front"
          round="small"
          elevation="large"
        >
          <CardBody pad="medium" gap="medium">
            <LayerHeader
              id="layer-header"
              closeId="layer-close"
              title="Create pipeline"
              // eslint-disable-next-line max-len
              subtitle="A form for entering the details needed to create a new pipeline."
              onClose={() => {}}
              border={{ style: 'dashed' }}
            />
            <Box
              id="layer-body"
              border={{ style: 'dashed' }}
              align="center"
              justify="center"
              pad="3xsmall"
            >
              Body
            </Box>
            <Footer
              id="layer-footer"
              border={{ style: 'dashed' }}
              justify="end"
              gap="small"
            >
              <Button id="layer-cancel" label="Cancel" />
              <Button id="layer-confirm" label="Create pipeline" primary />
            </Footer>
          </CardBody>
        </Card>
      </AnatomyGrid>
      <Diagram connections={connections} />
    </Stack>
  );
};
