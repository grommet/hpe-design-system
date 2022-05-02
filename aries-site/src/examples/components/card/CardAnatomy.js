import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardBody, CardFooter, Text, defaultProps } from 'grommet';
import { Info, Emoji } from 'grommet-icons';

const spacing = defaultProps.theme.global.edgeSize;

export function CardAnatomy() {
  return <Card background="background-front" width="medium">
    <CardBody>
      <Identifier
        icon={<Emoji size="large" color="text-strong" />}
        title="Title of the Card"
        subtitle="Subtext to provide further context"
      />
      <Box gap="xsmall" pad={{ top: 'medium' }}>
        <ContentBlock
          height={spacing.medium}
          width="100%"
          pad={{ horizontal: 'xsmall' }}
        >
          <Text>Flexible content area</Text>
        </ContentBlock>
        <ContentBlock height={spacing.medium} width="100%" />
        <ContentBlock height={spacing.medium} width="small" />
      </Box>
    </CardBody>
    <CardFooter align="center" gap="small" justify="start">
      <Info />
      <Text>
        Versatile area for presenting context, meta data, or other related
        information.
      </Text>
    </CardFooter>
  </Card>;
}

function Identifier({ title, subtitle, icon }) {
  return <Box direction="row" gap="small" align="center">
    <Box pad={{ vertical: 'xsmall' }}>{icon}</Box>
    <Box>
      <Text color="text-strong" size="xxlarge" weight="bold">
        {title}
      </Text>
      <Text>{subtitle}</Text>
    </Box>
  </Box>;
}

Identifier.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  icon: PropTypes.node,
};

function ContentBlock({ background, height, width, ...rest }) {
  return <Box
    background={background}
    height={height}
    width={width}
    round="xxsmall"
    {...rest}
  />;
}

ContentBlock.propTypes = {
  background: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ dark: PropTypes.string, light: PropTypes.string }),
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ min: PropTypes.string, max: PropTypes.string }),
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ min: PropTypes.string, max: PropTypes.string }),
  ]),
};

ContentBlock.defaultProps = {
  background: 'background-back',
};
