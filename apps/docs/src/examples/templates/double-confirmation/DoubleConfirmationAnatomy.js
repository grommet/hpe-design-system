import {
  Box,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Diagram,
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
    fromTarget: '2',
    toTarget: 'confirmation-footer',
  },
];

const AnatomyGrid = ({ ...rest }) => {
  const columns = ['auto', 'medium'];
  const rows = ['auto', 'auto', 'auto'];
  return (
    <Grid
      columns={columns}
      rows={rows}
      areas={[
        ['annotation-1a', 'confirmation-area'],
        ['annotation-1b', 'confirmation-area'],
        ['annotation-2', 'confirmation-area'],
      ]}
      gap={{ column: 'medium' }}
      justifyContent="start"
      {...rest}
    />
  );
};

export const DoubleConfirmationAnatomy = () => {
  const annotations = [
    { id: '1a', gridArea: 'annotation-1a', target: '1a' },
    { id: '1b', gridArea: 'annotation-1b', target: '1b' },
    { id: '2', gridArea: 'annotation-2', target: '2' },
  ];

  return (
    <Stack margin={{ bottom: 'medium' }} interactiveChild="first">
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

        <Card gridArea="confirmation-area" elevation="large">
          <CardHeader>
            <LayerHeader
              title='Discard "Add application"?'
              subtitle="Your changes will not be applied."
            />
          </CardHeader>
          <CardFooter
            pad={{ top: 'none', bottom: 'medium', horizontal: 'medium' }}
          >
            <Box
              fill
              id="confirmation-footer"
              border={{ style: 'dashed' }}
              direction="row"
              gap="xsmall"
              round="small"
              justify="end"
            >
              <Button label="Cancel" />
              <Button label="Discard" primary />
            </Box>
          </CardFooter>
        </Card>
      </AnatomyGrid>
      <Diagram connections={connections} />
    </Stack>
  );
};
