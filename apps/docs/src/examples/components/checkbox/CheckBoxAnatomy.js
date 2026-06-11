import React, { useContext } from 'react';
import { Box, CheckBox, Diagram, Grid, Stack, ThemeContext } from 'grommet';
import { Annotation } from '../../../layouts';
import { CheckBoxControlMock } from './CheckBoxControlMock';

const color = 'border';
const thickness = 'hair';
const type = 'direct';

const connections = [
  {
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: 'checkbox-annotation-1',
    toTarget: 'checkbox-control',
  },
  {
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: 'checkbox-annotation-1a',
    toTarget: 'checkmark-indicator',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: 'checkbox-annotation-2',
    toTarget: 'checkbox-label',
  },
];

const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['max-content', 'max-content', '4xsmall']}
    rows={['5xsmall', '5xsmall', '5xsmall']}
    areas={[
      ['empty-0', 'annotation-1', 'empty-1'],
      ['empty-2', 'checkbox-area', 'annotation-2'],
      ['empty-3', 'annotation-1a', 'empty-4'],
    ]}
    align="center"
    justify="center"
    {...rest}
  />
);

export const CheckBoxAnatomy = () => {
  const theme = useContext(ThemeContext);
  const checkboxTheme = theme.checkBox;

  const annotations = [
    {
      id: 'checkbox-annotation-1',
      gridArea: 'annotation-1',
      target: '1',
    },
    {
      id: 'checkbox-annotation-1a',
      gridArea: 'annotation-1a',
      target: '1a',
    },
    {
      id: 'checkbox-annotation-2',
      gridArea: 'annotation-2',
      target: '2',
    },
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

        <Box gridArea="checkbox-area" align="start">
          <CheckBox
            // Keep this controlled so semantics match the checked mock visual
            // and React won't warn about checked without an onChange handler.
            checked
            onChange={() => {}}
            label={
              <Box id="checkbox-label" align={checkboxTheme.label.align}>
                Choice
              </Box>
            }
          >
            {() => (
              <CheckBoxControlMock
                checkBoxTheme={checkboxTheme}
                controlId="checkbox-control"
                indicatorId="checkmark-indicator"
              />
            )}
          </CheckBox>
        </Box>
      </AnatomyGrid>
      <Diagram connections={connections} />
    </Stack>
  );
};
