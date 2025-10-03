import React from 'react';
import styled from 'styled-components';
import { Box, Button, Diagram, Grid, Stack, Text } from 'grommet';
import { Iteration, Checkmark } from 'grommet-icons';
import { Annotation } from '../../../layouts';

const StyledBox = styled(Box)`
  ${props =>
    props.selected &&
    // eslint-disable-next-line max-len
    `box-shadow: inset 0 0 0 1px ${props.theme.global.colors['border-selected']};`}
`;

// match focus indicator rounding to container
const StyledButton = styled(Button)`
  border-radius: ${props => props.theme.global.edgeSize[props.round]};
`;

const connection = (fromTarget, toTarget) => ({
  anchor: 'horizontal',
  type: 'direct',
  color: 'border',
  thickness: 'hair',
  fromTarget,
  toTarget,
});

const connections = [
  connection('s-1', 's-container'),
  connection('s-indicator', 's-2'),
  connection('s-3a', 's-icon'),
  connection('s-3b', 's-title'),
  connection('s-3c', 's-desc'),
  connection('s-4', 's-body'),
];

export const SelectorAnatomy = () => (
  <Stack>
    <Grid
      align="start"
      columns={['5xsmall', 'medium', '5xsmall']}
      rows={['40px', '24px', '16px', '80px']}
      areas={[
        ['cta-annotation-3a', 'card-example', 'cta-annotation-2'],
        ['cta-annotation-3b', 'card-example', 'cta-empty'],
        ['cta-annotation-3c', 'card-example', 'cta-empty'],
        ['cta-annotation-4', 'card-example', 'cta-annotation-1'],
      ]}
    >
      <Box gridArea="cta-empty" />
      <Annotation
        id="s-3a"
        alignSelf="center"
        target="3a"
        gridArea="cta-annotation-3a"
        margin={{ top: '6px' }}
      />
      <Annotation id="s-3b" target="3b" gridArea="cta-annotation-3b" />
      <Annotation id="s-3c" target="3c" gridArea="cta-annotation-3c" />
      <Annotation
        alignSelf="center"
        id="s-4"
        target="4"
        gridArea="cta-annotation-4"
        margin={{ top: '-4px' }}
      />
      <SelectorExample gridArea="card-example" />
      <Annotation
        style={{ justifySelf: 'center' }}
        id="s-2"
        target="2"
        gridArea="cta-annotation-2"
        margin={{ top: 'xsmall' }}
      />
      <Annotation
        style={{ justifySelf: 'center' }}
        id="s-1"
        target="1"
        gridArea="cta-annotation-1"
        margin={{ top: '-10px' }}
      />
      <Box gridArea="cta-empty" />
      <Box gridArea="cta-empty" />
      <Box gridArea="cta-empty" />
    </Grid>
    <Diagram connections={connections} />
  </Stack>
);

const DashedBox = ({ ...rest }) => (
  <Box
    alignSelf="start"
    border={{ style: 'dashed' }}
    round="xxsmall"
    {...rest}
  />
);

const SelectorExample = () => (
  <StyledButton tabindex={-1} round="xsmall">
    <StyledBox
      fill
      overflow="hidden"
      pad="xsmall"
      round="xsmall"
      selected
      border={{
        color: 'border-selected',
      }}
      id="s-container"
      gap="3xsmall"
    >
      <Box gap="3xsmall">
        <Box direction="row" gap="3xsmall" flex={false}>
          <Box flex>
            <Box gap="5xsmall">
              <Iteration id="s-icon" height="medium" />
              <Text id="s-title" weight={500} wordBreak="break-word">
                Aruba AP-635 Wifi 6E Access Point
              </Text>
            </Box>
            <Text id="s-desc">36 devices</Text>
          </Box>
          <Box
            border={{ color: 'transparent', size: 'xsmall' }}
            round="medium"
            height="24px"
            width="24px"
            justify="center"
            align="center"
            background="background-selected-primary-strong"
            flex={false}
          >
            <Checkmark id="s-indicator" aria-label="selected" size="small" />
          </Box>
        </Box>
      </Box>
      <DashedBox id="s-body">
        Flexible content section which can be tailored to the use case.
      </DashedBox>
    </StyledBox>
  </StyledButton>
);
