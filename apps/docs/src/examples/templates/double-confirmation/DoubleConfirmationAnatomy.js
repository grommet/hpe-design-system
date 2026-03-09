import { Button, Card, CardBody, Diagram, Footer, Grid, Stack } from 'grommet';
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
    toTarget: 'dbconfirmation-footer',
  },
];

const AnatomyGrid = ({ ...rest }) => {
  const columns = ['5xsmall', '4xsmall', 'xxsmall', 'xsmall'];
  const rows = ['flex', '5xsmall', '5xsmall', 'flex', '4xsmall'];

  return (
    <Grid
      columns={columns}
      rows={rows}
      areas={[
        [
          'empty-0',
          'dbconfirmation-area',
          'dbconfirmation-area',
          'dbconfirmation-area',
        ],
        [
          'annotation-1a',
          'dbconfirmation-area',
          'dbconfirmation-area',
          'dbconfirmation-area',
        ],
        [
          'annotation-1b',
          'dbconfirmation-area',
          'dbconfirmation-area',
          'dbconfirmation-area',
        ],
        [
          'empty-1',
          'dbconfirmation-area',
          'dbconfirmation-area',
          'dbconfirmation-area',
        ],
        [
          'annotation-2',
          'dbconfirmation-area',
          'dbconfirmation-area',
          'dbconfirmation-area',
        ],
      ]}
      aresas={[
        [
          'annotation-1a',
          'dbconfirmation-area',
          'dbconfirmation-area',
          'dbconfirmation-area',
        ],
        [
          'annotation-1b',
          'dbconfirmation-area',
          'dbconfirmation-area',
          'dbconfirmation-area',
        ],
        [
          'empty-0',
          'dbconfirmation-area',
          'dbconfirmation-area',
          'dbconfirmation-area',
        ],
        [
          'annotation-2',
          'dbconfirmation-area',
          'dbconfirmation-area',
          'dbconfirmation-area',
        ],
      ]}
      align="center"
      justify="center"
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

        <Card
          gridArea="dbconfirmation-area"
          background="background-front"
          round="small"
          alignSelf="start"
          justifySelf="start"
          elevation="large"
        >
          <CardBody pad="medium" gap="medium">
            <LayerHeader
              title='Discard "Add application"?'
              subtitle="Your changes will not be applied."
            />
            <Footer
              id="dbconfirmation-footer"
              border={{ style: 'dashed' }}
              justify="end"
              gap="small"
              round="small"
            >
              <Button label="Cancel" />
              <Button label="Discard" primary />
            </Footer>
          </CardBody>
        </Card>
      </AnatomyGrid>
      <Diagram connections={connections} />
    </Stack>
  );
};
