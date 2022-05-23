import React from 'react';
import PropTypes from 'prop-types';
import { Diagram, Grid, Stack } from 'grommet';
import { Annotation } from '../../../layouts';
import { PageHeaderContentRegions } from '.';

const color = 'border';
const anchor = 'horizontal';
const thickness = 'hair';
const type = 'direct';

const connections = [
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '1a',
    toTarget: 'title',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '1b',
    toTarget: 'subtitle',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'parent',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '3',
    toTarget: 'actions',
  },
];

export const PageHeaderAnatomy = ({ background }) => (
  <Stack>
    <Grid
      columns={['auto', 'flex', 'auto']}
      rows={['auto', 'auto', 'auto']}
      areas={[
        ['annotation-2', 'pageheader', 'null'],
        ['annotation-1a', 'pageheader', 'annotation-3'],
        ['annotation-1b', 'pageheader', 'null-2'],
      ]}
      gap={{ column: 'large' }}
    >
      <Annotation
        id={2}
        target="2"
        gridArea="annotation-2"
        alignSelf="center"
      />
      <Annotation
        id="1a"
        target="1a"
        gridArea="annotation-1a"
        alignSelf="center"
      />
      <Annotation
        id="1b"
        target="1b"
        gridArea="annotation-1b"
        alignSelf="center"
      />
      <Annotation
        id={3}
        target="3"
        gridArea="annotation-3"
        alignSelf="center"
      />
      <PageHeaderContentRegions gridArea="pageheader" background={background} />
    </Grid>
    <Diagram connections={connections} />
  </Stack>
);

PageHeaderAnatomy.propTypes = {
  background: PropTypes.string,
};
