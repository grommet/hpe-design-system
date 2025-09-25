import { useContext } from 'react';
import { Box, Diagram, Stack, ThemeContext } from 'grommet';
import { LinkPrevious, LinkNext } from 'grommet-icons';
import { TextEmphasis } from 'aries-core';
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

const PAGE_CONTAINER_WIDTH = '1536px';
const PAGE_CONTAINER_SCALE = '80%';

export const PageContainerWide = () => {
  const theme = useContext(ThemeContext);
  const diagramHeight = theme.global.size.medium;
  const diagramWidth = `${(diagramHeight.replace('px', '') * 4) / 3}px`;
  const annotationMargin = `${
    (100 - PAGE_CONTAINER_SCALE.replace('%', '')) / 1.65
  }%`;

  const widthAnnnotation = (
    <Box
      direction="row"
      align="center"
      justify="between"
      fill="vertical"
      margin={{ horizontal: annotationMargin }}
      pad={{ top: '3xlarge' }}
    >
      <LinkPrevious id="left-edge" color="text-strong" />
      <Box id="label" pad={{ horizontal: '3xsmall' }} background="orange">
        <TextEmphasis>{PAGE_CONTAINER_WIDTH}</TextEmphasis>
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
        gap="xsmall"
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
              gap="xsmall"
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
                height="xsmall"
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
