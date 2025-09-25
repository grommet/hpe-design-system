import React, { useContext } from 'react';
import {
  Box,
  Image,
  Grid,
  Diagram,
  Stack,
  ThemeContext,
  ResponsiveContext,
} from 'grommet';
import { Annotation } from '../../../layouts';

const color = 'border';
const anchor = 'vertical';
const thickness = 'hair';
const type = 'direct';

const connections = [
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '1',
    toTarget: 'leftVisual',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'rightVisual',
  },
];

const AnatomyGrid = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid
      columns={
        !['xsmall', 'small'].includes(size)
          ? ['medium', 'medium']
          : ['xsmall', 'xsmall']
      }
      rows={['5xsmall', 'auto']}
      gap="none"
      justify="center"
      {...rest}
    />
  );
};

export const AscendingNavigationAnatomy = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack margin={{ bottom: 'medium' }}>
      <AnatomyGrid>
        <Annotation id={1} target="1" />
        <Annotation id={2} target="2" />
        <Box width="medium" id="leftVisual">
          <Image
            alt="test"
            src={
              theme.dark
                ? '/templateImages/ascending-nav-left-invert.png'
                : '/templateImages/ascending-nav-left.png'
            }
          />
        </Box>
        <Box width="medium" id="rightVisual">
          <Image
            alt="test"
            src={
              theme.dark
                ? '/templateImages/ascending-nav-right-invert.png'
                : '/templateImages/ascending-nav-right.png'
            }
          />
        </Box>
      </AnatomyGrid>
      <Diagram connections={connections} />
    </Stack>
  );
};
