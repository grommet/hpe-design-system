import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Box, Grid, ResponsiveContext } from 'grommet';
import { Annotation } from '../../../layouts';

export const PageHeaderAnatomy = ({ background }) => {
  const theme = useContext(ThemeContext);
  const breakpoint = useContext(ResponsiveContext);
  return (
    <Box background={background} fill>
      <Grid {...theme.pageHeader[breakpoint]} fill="horizontal">
        <Box
          gridArea="parent"
          background="orange"
          pad="small"
          round="xxsmall"
          width="small"
        >
          <Annotation id={2} target="2" />
        </Box>
        <Box gridArea="title" background="purple!" round="xxsmall" pad="small">
          <Annotation
            background={{ color: 'background-front', dark: false }}
            id={1}
            target="1a"
          />
        </Box>
        <Box
          gridArea="subtitle"
          background="purple!"
          round="xxsmall"
          pad="small"
        >
          <Annotation
            background={{ color: 'background-front', dark: false }}
            id={1}
            target="1b"
          />
        </Box>
        <Box
          alignSelf="start"
          gridArea="actions"
          background="blue"
          pad="small"
          width={
            ['xsmall', 'small', 'medium'].includes(breakpoint)
              ? 'small'
              : 'medium'
          }
          round="xxsmall"
        >
          <Annotation id={3} target="3" />
        </Box>
      </Grid>
    </Box>
  );
};

PageHeaderAnatomy.propTypes = {
  background: PropTypes.string,
};
