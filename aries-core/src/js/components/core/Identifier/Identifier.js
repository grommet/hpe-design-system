import React from 'react';
import PropTypes from 'prop-types';
import { NotifTag } from '../../../../../../aries-site/src/layouts/content/NotifTag';

import { Box, Heading, Text } from 'grommet';

export const Identifier = ({
  children,
  level,
  title,
  subTitle,
  size,
  updates,
  type,
  ...rest
}) => {
  return (
    <Box align="center" {...rest}>
      <Box direction="row" justify="between" fill="horizontal">
        {children}
        {updates && type === 'Update' && (
          <NotifTag
            color="teal"
            allyDes={`There's been updates for ${title}`}
            textVal="Updated"
            size="small"
          />
        )}
        {updates && type === 'New' && (
          <NotifTag
            color="purple"
            allyDes={`There's a new item called ${title}`}
            textVal="New!"
            size="small"
          />
        )}
      </Box>
      <Box direction="row" align="center" justify="center" gap="xsmall">
        {level ? (
          <Heading level={level} margin="none">
            {title}
          </Heading>
        ) : (
          <Text size={size} weight="bold" color="text-strong">
            {title}
          </Text>
        )}
        <Text size={size}>{subTitle}</Text>
      </Box>
    </Box>
  );
};

Identifier.propTypes = {
  children: PropTypes.node,
  level: PropTypes.number,
  title: PropTypes.string,
  size: PropTypes.string,
  subTitle: PropTypes.string,
};

Identifier.defaultProps = {
  children: undefined,
  level: undefined,
  size: 'medium',
  subTitle: undefined,
  title: undefined,
};
