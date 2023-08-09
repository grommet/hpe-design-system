import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'grommet';

import { Box, Heading, Text } from 'grommet';

import { useDarkMode } from '../../../../../../aries-site/src/utils';

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
  return(
  <Box align="center" {...rest}>
    <Box direction='row' justify='between' fill='horizontal'>
      {children}
        {updates && (type === "Update") &&
            <Tag 
            size='small' 
            border={{
              color: 'border-weak',
              size: "xsmall",
              style: "solid",
              side: "all"
            }}  
            background={{ dark: true, color: "teal" }}
            value="Updated"
            a11yTitle={`There's been updates for ${title}`}/>
        }
        {updates && (type === "New") &&
            <Tag 
            size='small' 
            border={{
              color: 'border-weak',
              size: "xsmall",
              style: "solid",
              side: "all"
            }}  
            background={{ dark: true, color: "purple" }}
            value="New!"
            a11yTitle={`There's a new item called ${title}`}/>
        }
    </Box>
    <Box
    direction='row'
    align='center'
    justify='center'
    gap='xsmall'>
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
