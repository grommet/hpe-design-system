import { useContext } from 'react';
import { Box, Diagram, Grid, ResponsiveContext, Stack } from 'grommet';
import { connection } from '../../../../utils';
import { Annotation } from '../../../../layouts';
import { ChildHeader } from '../../FormChildObject';

const annotations = {
  container: { annotation: 'annotation-1', element: 'header-container' },
  label: { annotation: 'annotation-2', element: 'header-label' },
  icon: { annotation: 'annotation-3', element: 'header-icon' },
  valuesSummary: { annotation: 'annotation-4', element: 'header-summary' },
  border: { annotation: 'annotation-5', element: 'header-container' },
};

const connections = [
  connection(
    annotations.container.annotation,
    annotations.container.element,
    'vertical',
    'rectilinear',
  ),
  connection(annotations.label.annotation, annotations.label.element),
  connection(annotations.icon.annotation, annotations.icon.element),
  connection(
    annotations.valuesSummary.annotation,
    annotations.valuesSummary.element,
  ),
  connection(
    annotations.border.annotation,
    annotations.border.element,
    'vertical',
    'rectilinear',
  ),
];

export const CollapsedStateAnatomy = () => {
  const breakpoint = useContext(ResponsiveContext);
  const mobile = ['xsmall', 'small'].includes(breakpoint);
  const columns = [
    'xsmall',
    !mobile ? 'small' : 'xsmall',
    !mobile ? 'small' : 'xsmall',
    'xsmall',
    'xsmall',
  ];
  const rows = ['auto', 'auto', 'auto', 'auto', 'auto'];
  const areas = [
    [
      'empty-1',
      annotations.container.annotation,
      annotations.border.annotation,
      'empty-3',
      'empty-3',
    ],
    [annotations.label.annotation, 'header', 'header', 'empty-4', 'empty-4'],
    ['empty-5', 'header', 'header', annotations.icon.annotation, 'empty-7'],
    [
      annotations.valuesSummary.annotation,
      'header',
      'header',
      'empty-6',
      'empty-8',
    ],
  ];

  return (
    <Stack interactiveChild="first">
      <Grid columns={columns} rows={rows} areas={areas} align="center">
        <Annotation
          gridArea={annotations.container.annotation}
          id={annotations.container.annotation}
          target="1"
          margin={{ bottom: 'xlarge', horizontal: 'auto' }}
        />
        <Annotation
          gridArea={annotations.label.annotation}
          id={annotations.label.annotation}
          target="2"
        />
        <Annotation
          gridArea={annotations.icon.annotation}
          id={annotations.icon.annotation}
          target="3"
          margin={{ left: 'auto' }}
        />
        <Annotation
          gridArea={annotations.valuesSummary.annotation}
          id={annotations.valuesSummary.annotation}
          target="4"
        />
        <Annotation
          gridArea={annotations.border.annotation}
          id={annotations.border.annotation}
          kind="style"
          target="5"
          margin={{ bottom: 'xlarge', horizontal: 'auto' }}
        />
        {/* this Box is for defining the anatomy diagram */}
        <Box
          gridArea="header"
          background="background-front"
          border={{ side: 'bottom', color: 'border-weak' }}
        >
          <ChildHeader
            collectionName="Hosts"
            index={0}
            level={3}
            name="Object's name"
            open={false}
            summary="Summary of select object values, truncated if needed"
            // disable hover interactivity for anatomy
            onMouseEnter={() => null}
            annotationIds={{
              container: annotations.container.element,
              label: annotations.label.element,
              icon: annotations.icon.element,
              valuesSummary: annotations.valuesSummary.element,
            }}
          />
        </Box>
      </Grid>
      <Diagram connections={connections} />
    </Stack>
  );
};
