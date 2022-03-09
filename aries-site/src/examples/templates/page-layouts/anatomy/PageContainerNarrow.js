import { useContext } from 'react';
import { Box, Diagram, Stack, Text, ThemeContext } from 'grommet';
import { LinkPrevious, LinkNext } from 'grommet-icons';

import { ContentArea } from './components';

const connections = [
  {
    fromTarget: 'narrow-left-edge',
    toTarget: 'narrow-container',
    anchor: 'horizontal',
    color: 'text-strong',
  },
  {
    fromTarget: 'narrow-right-edge',
    toTarget: 'narrow-container',
    anchor: 'horizontal',
    color: 'text-strong',
  },
];

const PAGE_CONTAINER_WIDTH = '768px';
const PAGE_CONTAINER_SCALE = '50%';

export const PageContainerNarrow = () => {
  const theme = useContext(ThemeContext);
  const diagramHeight = theme.global.size.medium;
  const diagramWidth = `${(diagramHeight.replace('px', '') * 4) / 3}px`;
  const annotationMargin = `${(100 - PAGE_CONTAINER_SCALE.replace('%', '')) /
    1.9}%`;

  const widthAnnnotation = (
    <Box
      direction="row"
      align="center"
      justify="between"
      fill="vertical"
      margin={{ horizontal: annotationMargin }}
      pad={{ top: 'xlarge' }}
    >
      <LinkPrevious id="narrow-left-edge" color="text-strong" />
      <Box
        id="narrow-container"
        pad={{ horizontal: 'xsmall' }}
        background="orange"
      >
        <Text color="text-strong" weight="bold">
          {PAGE_CONTAINER_WIDTH}
        </Text>
      </Box>
      <LinkNext id="narrow-right-edge" color="text-strong" />
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
          <ContentArea title="Page" border>
            <ContentArea
              title="PageContent"
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
                title="Other Content"
                background="orange"
                border
                height="small"
              />
            </ContentArea>
          </ContentArea>
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
