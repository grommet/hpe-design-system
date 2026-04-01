import React, { useState } from 'react';
import { Box, CheckBox, Grid, Diagram, Stack, Text } from 'grommet';
import { Annotation } from '../../../layouts';

const color = 'border';
const thickness = 'hair';
const type = 'direct';

// Annotations 1 and 2 sit in the TOP ROW above the component (anchor: 'vertical')
// matching MenuAnatomy's 1a/1b pattern for sub-parts of a single horizontal row.
const connections = [
  {
    // Region 1: checkbox square — annotation ABOVE col 0, wire draws DOWN
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '1',
    toTarget: 'checkbox-input',
  },
  {
    // Region 2: label text — annotation ABOVE col 1, wire draws DOWN
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'checkbox-label',
  },
];

// 2-column grid matching MenuAnatomy's sub-part pattern:
//   col 0 (max-content) — left sub-part: annotation-1 above, checkbox square below
//   col 1 (max-content) — right sub-part: annotation-2 above, label text below
//
// Row 0 (5xsmall): [annotation-1] [annotation-2]   ← above component
// Row 1 (auto):    [checkbox-area spans cols 0+1]
const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['max-content', 'max-content']}
    rows={['5xsmall', 'auto']}
    areas={[
      ['annotation-1', 'annotation-2'],
      ['checkbox-area', 'checkbox-area'],
    ]}
    align="center"
    {...rest}
  />
);

export const CheckBoxAnatomy = () => {
  const [checked, setChecked] = useState(true);

  const annotations = [
    { id: '1', gridArea: 'annotation-1', target: '1' },
    { id: '2', gridArea: 'annotation-2', target: '2' },
  ];

  return (
    <Stack margin={{ bottom: 'medium' }} interactiveChild="last">
      <AnatomyGrid>
        {annotations.map(({ id, gridArea, target }) => (
          <Annotation key={id} id={id} target={target} gridArea={gridArea} />
        ))}

        {/* checkbox-area: CheckBox WITHOUT label prop so id="checkbox-input" wraps
            only the square — keeping it narrow so annotation-1's vertical wire
            lands accurately on the square, matching MenuAnatomy's menu-label/menu-icon
            isolation pattern. Label is a sibling with its own id for annotation-2. */}
        <Box gridArea="checkbox-area" pad={{ vertical: 'xsmall' }}>
          <Box direction="row" align="center" gap="xsmall">
            <Box id="checkbox-input" flex={false}>
              <CheckBox
                checked={checked}
                onChange={event => setChecked(event.target.checked)}
              />
            </Box>
            <Text id="checkbox-label">Accept terms</Text>
          </Box>
        </Box>

      </AnatomyGrid>

      <Diagram connections={connections} />
    </Stack>
  );
};
