import { Diagram, Grid, Stack } from 'grommet';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils';
import { DoubleConfirmationCardAnatomy } from './DoubleConfirmationCards';

const connections = [
  connection('1a-confirmation', 'confirmation-title'),
  connection('1b-confirmation', 'confirmation-subtitle'),
  connection('2-confirmation', 'confirmation-footer'),
];

export const DoubleConfirmationAnatomy = () => {
  const columns = ['36px', 'medium', 'auto'];
  const rows = ['24px', '37px', '25px', '24px', '36px', '24px'];

  const areas = [
    ['empty-0', 'layer', 'empty'],
    ['annotation-1a', 'layer', 'empty'],
    ['annotation-1b', 'layer', 'empty-3'],
    ['gap-1', 'layer', 'empty-3'],
    ['annotation-2', 'layer', 'empty-4'],
    ['empty-2', 'layer', 'annotation-round'],
  ];

  return (
    <Stack interactiveChild="first">
      <Grid
        columns={columns}
        rows={rows}
        areas={areas}
        gap={{ column: 'xlarge' }}
      >
        <Annotation
          alignSelf="center"
          id="1a-confirmation"
          target="1a"
          gridArea="annotation-1a"
        />
        <Annotation
          alignSelf="center"
          id="1b-confirmation"
          target="1b"
          gridArea="annotation-1b"
        />
        <Annotation
          alignSelf="center"
          id="2-confirmation"
          target="2"
          gridArea="annotation-2"
        />
        <DoubleConfirmationCardAnatomy gridArea="layer" />
      </Grid>
      <Diagram connections={connections} />
    </Stack>
  );
};
