import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Text,
  defaultProps,
} from 'grommet';
import { Image as ImageIcon, Location } from 'grommet-icons';

const spacing = defaultProps.theme.global.edgeSize;

const ContentBlock = ({ background, height, width }) => (
  <Box background={background} height={height} width={width} round="xxsmall" />
);

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

const IdentifierBlock = ({ background }) => (
  <Box gap="xsmall">
    <ContentBlock
      background={background}
      height={spacing.large}
      width="small"
    />
    <ContentBlock
      background={background}
      height={spacing.medium}
      width="xsmall"
    />
  </Box>
);

IdentifierBlock.propTypes = {
  background: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ dark: PropTypes.string, light: PropTypes.string }),
  ]),
};

export const CardDefaults = () => (
  <Card>
    <CardHeader>Card Header</CardHeader>
    <CardBody>Card Body</CardBody>
    <CardFooter>Card Footer</CardFooter>
  </Card>
);

export const Identifier = () => (
  <Card>
    <CardBody>
      {/* <Text color="text-strong" size="xxlarge" weight="bold">
        Heading
      </Text>
      <Text>Subtitle</Text> */}
      <IdentifierBlock />
    </CardBody>
  </Card>
);

export const IdentifierImageRow = () => (
  <Card>
    <CardBody>
      <Box direction="row" align="center">
        <ImageIcon size="large" color="background-back" />
        {/* <Image src="/static/images/color-swirls.png" /> */}
        <Box margin={{ left: 'medium' }}>
          <IdentifierBlock />
        </Box>
      </Box>
    </CardBody>
  </Card>
);

export const IdentifierFooter = () => (
  <Card>
    <CardBody>
      <IdentifierBlock />
    </CardBody>
    <CardFooter
      background="none"
      border={{ color: 'border-weak', side: 'top' }}
    >
      <Box direction="row" align="center" gap="small">
        <ContentBlock height={spacing.medium} width={spacing.medium} />
        <ContentBlock height={spacing.medium} width="small" />
      </Box>
    </CardFooter>
  </Card>
);

export const IdentifierIconRow = () => (
  <Card>
    <CardBody direction="row" align="center" gap="small">
      <Location size="large" />
      <Box>
        <IdentifierBlock />
      </Box>
    </CardBody>
  </Card>
);

export const IdentifierIconColumn = () => (
  <Card>
    <CardBody gap="small">
      <Location size="large" />
      <Box>
        <IdentifierBlock />
      </Box>
    </CardBody>
  </Card>
);

export const ImageCard = () => (
  <Card>
    <Box>
      <Image fit="cover" src="/templateImages/map-07.png" />
    </Box>
    <CardBody flex={false} pad={{ vertical: 'small', horizontal: 'medium' }}>
      <ContentBlock height={spacing.medium} width="small" />
    </CardBody>
  </Card>
);

export const MapCard = () => (
  <Card>
    <CardBody>
      <Text color="text-strong" size="xxlarge" weight="bold">
        Heading
      </Text>
      <Text>Subtitle</Text>
    </CardBody>
    <Image src="/static/images/map-07.png" />
  </Card>
);

export const HelpHeader = () => (
  <Card>
    <CardHeader
      border={{ color: 'border-weak', side: 'bottom' }}
      pad={{ horizontal: 'medium', vertical: 'small' }}
    >
      <ContentBlock height={spacing.medium} width="small" />
    </CardHeader>
    <CardBody gap="xsmall" pad={{ vertical: 'medium', horizontal: 'medium' }}>
      <ContentBlock height={spacing.medium} width="100%" />
      <ContentBlock height={spacing.medium} width="100%" />
      <ContentBlock height={spacing.medium} width="small" />
    </CardBody>
  </Card>
);

export const ColorCard = () => {
  return (
    <Card background="blue!">
      <CardBody direction="row" gap="small" align="center">
        <ImageIcon size="large" color="background-contrast" />
        <IdentifierBlock background="background-contrast" />
      </CardBody>
      <CardFooter>
        <Box direction="row" align="center" gap="small">
          <ContentBlock
            background="background-contrast"
            height={spacing.medium}
            width={spacing.medium}
          />
          <ContentBlock
            background="background-contrast"
            height={spacing.medium}
            width="small"
          />
        </Box>
      </CardFooter>
    </Card>
  );
};
