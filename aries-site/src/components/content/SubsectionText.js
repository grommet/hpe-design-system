import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Tag, Paragraph } from 'grommet';

import { TEXT_SIZE } from '../../layouts';
import { HighlightPhrase } from './HighlightPhrase';

const StyledBox = styled(Box)`
  code {
    background: ${({ theme }) =>
      theme.global.colors['background-contrast'][
        theme.dark ? 'dark' : 'light'
      ]};
    border: 1px solid
      ${({ theme }) =>
        theme.global.colors.border[theme.dark ? 'dark' : 'light']};
    border-radius: 4px;
    padding: 0px 3px;
    font-family: Metric;
  }
`;

export const SubsectionText = ({
  children,
  level,
  size,
  accessibility,
  ...rest
}) => (
  <StyledBox gap="xsmall" width="large" margin={{ bottom: 'medium' }}>
    <Paragraph size={size || TEXT_SIZE[level]} fill margin="none" {...rest}>
      <HighlightPhrase size={size || TEXT_SIZE[level]}>
        {children}
      </HighlightPhrase>
    </Paragraph>
    {accessibility && (
      <Tag
        alignSelf="start"
        border={{ color: 'brand' }}
        value={accessibility}
        onClick={() =>
          document.getElementById('status').scrollIntoView({ behavior: 'auto' })
        }
      />
    )}
  </StyledBox>
);

SubsectionText.propTypes = {
  accessibility: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
  ]),
  level: PropTypes.number,
  size: PropTypes.string,
};

SubsectionText.defaultProps = {
  level: 2,
  size: undefined,
};