/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Stack } from 'grommet';
import { Aruba, BusinessService, Hpe } from 'grommet-icons';

import { Identifier, Tile, Tiles } from 'aries-core';
import { aries } from '../../../../../../../aries-site/src/themes/aries';

export default {
  title: 'Identifier',
};

const Avatar = ({ round, ...rest }) => (
  <Box
    height="xxsmall"
    width="xxsmall"
    round={round || 'full'}
    // eslint-disable-next-line max-len
    background="url(//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80)"
    {...rest}
  />
);

const BasicTile = ({ title, subTitle, ...rest }) => (
  <Tile background="background-front" pad="small" alignSelf="center">
    <Identifier
      title={title}
      subTitle={subTitle}
      size="small"
      gap="medium"
      pad="small"
      {...rest}
    />
  </Tile>
);

export const Children = () => (
  <Grommet theme={aries}>
    <Box>
      <Tiles
        margin="large"
        gap="medium"
        columns={['medium', 'medium', 'medium']}
      >
        <BasicTile title="Icon" subTitle="Standard Icon Child">
          <BusinessService size="large" />
        </BasicTile>
        <BasicTile title="Avatar" subTitle="Component Child" size="small">
          <Avatar />
        </BasicTile>
        <BasicTile title="Notified Avatar" subTitle="Component Child">
          <Stack anchor="top-right">
            <Avatar round="small" margin="xxsmall" />
            <Box pad="xsmall" round background="yellow!" />
          </Stack>
        </BasicTile>
        <BasicTile title="Aruba" subTitle="Box Child">
          <Box background="orange" pad="xsmall" round="small">
            <Aruba size="large" />
          </Box>
        </BasicTile>
        <BasicTile title="Aruba" subTitle="Box Child">
          <Box background="white" pad="xsmall" round="small">
            <Aruba size="large" color="orange" />
          </Box>
        </BasicTile>
        <BasicTile title="Aruba" subTitle="Box Child">
          <Box background="teal" pad="xsmall" round="small">
            <Aruba size="large" color="teal!" />
          </Box>
        </BasicTile>
        <BasicTile title="HPE" subTitle="Wrapped Hpe Icon">
          <Box background="green!" pad="xsmall" margin="xxsmall" round="small">
            <Hpe size="large" color="teal" />
          </Box>
        </BasicTile>
        <BasicTile title="HPE" subTitle="Wrapped Hpe Icon">
          <Box background="purple!" pad="xsmall" margin="xxsmall" round="small">
            <Hpe size="large" color="teal!" />
          </Box>
        </BasicTile>
        <BasicTile title="HPE Notification" subTitle="Stack Child">
          <Stack anchor="top-right">
            <Box background="white" pad="xsmall" margin="xxsmall" round="small">
              <Hpe size="large" color="teal!" />
            </Box>
            <Box pad="xsmall" round background="brand" />
          </Stack>
        </BasicTile>
      </Tiles>
    </Box>
  </Grommet>
);

storiesOf('Identifier', module).add('Children', () => <Children />);
