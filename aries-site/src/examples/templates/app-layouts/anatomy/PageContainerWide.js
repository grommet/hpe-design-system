import { useContext } from 'react';
import { Box, Diagram, Stack, Text, ThemeContext } from 'grommet';
import { LinkPrevious, LinkNext } from 'grommet-icons';

import { ContentArea } from './components';

const connections = [
  {
    fromTarget: 'left-edge',
    toTarget: 'label',
    anchor: 'horizontal',
    color: 'text-strong',
  },
  {
    fromTarget: 'right-edge',
    toTarget: 'label',
    anchor: 'horizontal',
    color: 'text-strong',
  },
];

const PAGE_CONTAINER_WIDTH = '1608px';
const PAGE_CONTAINER_SCALE = '80%';

export const PageContainerWide = () => {
  const theme = useContext(ThemeContext);
  const diagramHeight = theme.global.size.medium;
  const diagramWidth = `${(diagramHeight.replace('px', '') * 4) / 3}px`;
  const annotationMargin = `${(100 - PAGE_CONTAINER_SCALE.replace('%', '')) /
    2}%`;

  const widthAnnnotation = (
    <Box
      direction="row"
      align="center"
      justify="between"
      fill="vertical"
      margin={{ horizontal: annotationMargin }}
      pad={{ top: 'xlarge' }}
    >
      <LinkPrevious id="left-edge" color="text-strong" />
      <Box id="label" pad={{ horizontal: 'xsmall' }} background="orange">
        <Text color="text-strong" weight="bold">
          {PAGE_CONTAINER_WIDTH}
        </Text>
      </Box>
      <LinkNext id="right-edge" color="text-strong" />
    </Box>
  );

  return (
    <Stack>
      <ContentArea
        title="App Container"
        border
        flex={false}
        gap="small"
        round="xsmall"
        width={diagramWidth}
      >
        <ContentArea title="Global Header" background="green" flex={false} />
        <Stack>
          <Box>
            <ContentArea
              title="Page Container"
              alignSelf="center"
              border
              flex={false}
              gap="small"
              width={PAGE_CONTAINER_SCALE}
            >
              <ContentArea
                title="Page Header"
                background="purple!"
                flex={false}
              />
              <ContentArea
                title="Page Content"
                background="orange"
                height="small"
              />
            </ContentArea>
          </Box>
          {widthAnnnotation}
        </Stack>
        <ContentArea title="Global Footer" background="green" flex={false} />
      </ContentArea>
      <Diagram connections={connections} />
    </Stack>
  );
};
