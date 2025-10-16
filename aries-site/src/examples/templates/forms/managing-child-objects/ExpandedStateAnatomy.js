import { useContext } from 'react';
import {
  Box,
  Button,
  Diagram,
  Grid,
  ResponsiveContext,
  Stack,
  Text,
} from 'grommet';
import { Trash } from '@hpe-design/icons-grommet';
import { connection } from '../../../../utils';
import { Annotation } from '../../../../layouts';
import { ChildHeader } from '../../FormChildObject';

const annotations = {
  container: { annotation: 'expanded-1', element: 'expanded-container' },
  label: { annotation: 'expanded-2', element: 'expanded-label' },
  icon: { annotation: 'expanded-3', element: 'expanded-icon' },
  body: { annotation: 'expanded-4', element: 'body' },
  remove: { annotation: 'expanded-5', element: 'remove-button' },
};

const connections = [
  connection(
    annotations.container.annotation,
    annotations.container.element,
    'vertical',
  ),
  connection(annotations.label.annotation, annotations.label.element),
  connection(annotations.icon.annotation, annotations.icon.element),
  connection(annotations.body.annotation, annotations.body.element),
  connection(annotations.remove.annotation, annotations.remove.element),
];

export const ExpandedStateAnatomy = () => {
  const breakpoint = useContext(ResponsiveContext);
  const mobile = ['xsmall', 'small'].includes(breakpoint);
  const columns = [
    '3xsmall',
    !mobile ? 'xsmall' : '3xsmall',
    !mobile ? 'xsmall' : '3xsmall',
    '3xsmall',
  ];
  const rows = ['auto', 'auto', 'auto', 'auto'];
  const areas = [
    [
      'empty-1',
      annotations.container.annotation,
      annotations.container.annotation,
      'empty-3',
    ],
    [
      annotations.label.annotation,
      'header',
      'header',
      annotations.icon.annotation,
    ],
    [annotations.body.annotation, 'body', 'body', 'empty-4'],
    ['empty-5', 'footer', 'footer', annotations.remove.annotation],
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
          gridArea={annotations.body.annotation}
          id={annotations.body.annotation}
          target="4"
        />
        <Annotation
          gridArea={annotations.remove.annotation}
          id={annotations.remove.annotation}
          target="5"
          margin={{ left: 'auto' }}
        />
        {/* this Box is for defining the anatomy diagram */}
        <Box gridArea="header" background="background-front">
          <ChildHeader
            collectionName="Hosts"
            index={0}
            level={3}
            name="Object's name"
            open
            // disable hover interactivity for anatomy
            onMouseEnter={() => null}
            annotationIds={{
              container: annotations.container.element,
              label: annotations.label.element,
              icon: annotations.icon.element,
            }}
          />
        </Box>
        <Box gridArea="body" background="background-front">
          <Box
            id={annotations.body.element}
            align="center"
            border={{ style: 'dashed' }}
            height="xsmall"
            justify="center"
            margin={{ horizontal: 'xsmall', top: 'medium', bottom: 'xsmall' }}
          >
            <Text>Body</Text>
          </Box>
        </Box>
        <Box
          gridArea="footer"
          background="background-front"
          pad={{ bottom: 'medium' }}
          border={{ side: 'bottom', color: 'border-weak' }}
        >
          <Button
            a11yTitle="Delete item"
            id={annotations.remove.element}
            icon={<Trash />}
            alignSelf="end"
          />
        </Box>
      </Grid>
      <Diagram connections={connections} />
    </Stack>
  );
};
