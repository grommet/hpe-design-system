import { useContext } from 'react';
import { Box, Diagram, Stack, ThemeContext } from 'grommet';
import { LinkPrev, LinkNext } from '@hpe-design/icons-grommet';
import { TextEmphasis } from 'aries-core';
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
  const annotationMargin = `${
    (100 - PAGE_CONTAINER_SCALE.replace('%', '')) / 1.9
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
      <LinkPrev id="narrow-left-edge" color="text-strong" />
      <Box
        id="narrow-container"
        pad={{ horizontal: '3xsmall' }}
        background={{ color: 'decorative-blue', opacity: 'weak' }}
      >
        <TextEmphasis>{PAGE_CONTAINER_WIDTH}</TextEmphasis>
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
        gap="xsmall"
        round="xsmall"
        width={diagramWidth}
      >
        <ContentArea
          title="Global Header"
          background={{ color: 'decorative-neutral', opacity: 'weak' }}
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
                background={{ color: 'decorative-purple', opacity: 'weak' }}
                flex={false}
              />
              <ContentArea
                title="Other Content"
                background={{ color: 'decorative-blue', opacity: 'weak' }}
                border
                height="xsmall"
              />
            </ContentArea>
          </ContentArea>
          {widthAnnnotation}
        </Stack>
        <ContentArea
          title="Global Footer"
          background={{ color: 'decorative-neutral', opacity: 'weak' }}
          flex={false}
        />
      </ContentArea>
      <Diagram connections={connections} />
    </Stack>
  );
};
