import { useContext } from 'react';
import { Box, Diagram, Stack, Text, ThemeContext } from 'grommet';
import { LinkPrevious, LinkNext } from 'grommet-icons';

import { ContentArea } from './components';

const connections = [
  {
    fromTarget: 'full-left-edge',
    toTarget: 'full-container',
    anchor: 'horizontal',
    color: 'text-strong',
  },
  {
    fromTarget: 'full-right-edge',
    toTarget: 'full-container',
    anchor: 'horizontal',
    color: 'text-strong',
  },
];

const PAGE_CONTAINER_WIDTH = '100%';
const PAGE_CONTAINER_SCALE = '100%';

export const PageContainerFull = () => {
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
      <LinkPrevious id="full-left-edge" color="text-strong" />
      <Box
        id="full-container"
        pad={{ horizontal: 'xsmall' }}
        background="orange"
      >
        <Text color="text-strong" weight="bold">
          {PAGE_CONTAINER_WIDTH}
        </Text>
      </Box>
      <LinkNext id="full-right-edge" color="text-strong" />
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
        <ContentArea
          title="Global Header"
          background="status-unknown"
          flex={false}
        />
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
                border
                height="small"
              />
            </ContentArea>
          </Box>
          {widthAnnnotation}
        </Stack>
        <ContentArea
          title="Global Footer"
          background="status-unknown"
          flex={false}
        />
      </ContentArea>
      <Diagram connections={connections} />
    </Stack>
  );
};
