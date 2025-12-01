import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { dimension } from 'hpe-design-tokens/grommet';
import { Box, Text } from 'grommet';

const highlightBorder = {
  color: 'decorative-purple',
  size: 'small',
};

// eslint-disable-next-line react/prop-types
const Container = ({ children, ...rest }) => (
  <Box
    round="medium"
    background={{ dark: true, color: 'decorative-neutral' }}
    {...rest}
  >
    {children}
  </Box>
);

// eslint-disable-next-line react/prop-types
const Placeholder = ({ width = '75%' }) => (
  <Box
    height={dimension.hpe.spacing.small}
    background="background-contrast"
    width={width}
    round
  />
);

// eslint-disable-next-line react/prop-types
const Example = ({ children }) => (
  <Box
    direction="row"
    border={{ 
      style: 'dashed', 
      size: 'small',
      color: 'border-strong',
    }}
    width={{ min: '100%' }}
    align="start"
  >
    <Container width={{ min: dimension.hpe.spacing.xxlarge }}>
      <Box
        height={dimension.hpe.spacing.xxlarge}
        width={dimension.hpe.spacing.xxlarge}
      />
    </Container>
    <Box
      border={{ ...highlightBorder, side: 'vertical', style: 'solid' }}
      height={{ min: dimension.hpe.spacing.large }}
      flex={false}
      margin="5xsmall"
    >
      <Box
        width={dimension.hpe.spacing.xlarge}
        border={{ side: 'bottom', ...highlightBorder }}
        align="center"
      >
        <Text size="xsmall">gap</Text>
      </Box>
    </Box>
    <Box direction="row" align="start" flex="grow">
      {children}
      <Container width={{ min: '100%' }}>
        <Box gap="small" pad={{ vertical: 'small', horizontal: 'small' }}>
          <Box gap="3xsmall">
            <Placeholder width="100%" />
            <Placeholder />
            <Placeholder />
          </Box>
          <Box gap="3xsmall">
            <Placeholder width="100%" />
            <Placeholder />
          </Box>
        </Box>
      </Container>
    </Box>
  </Box>
);

// eslint-disable-next-line react/prop-types
export const AvoidMargin = ({ bestPractice = true }) => {
  if (!bestPractice) {
    return (
      <Example>
        <Box
          border={{ ...highlightBorder, side: 'vertical', style: 'solid' }}
          height={{ min: dimension.hpe.spacing.large }}
          flex={false}
          margin="5xsmall"
        >
          <Box
            width={{
              min: dimension.hpe.spacing.medium,
            }}
            border={{ side: 'bottom', ...highlightBorder }}
            align="center"
          >
            <Text size="xsmall">margin</Text>
          </Box>
        </Box>
      </Example>
    );
  }

  return <Example />;
};
