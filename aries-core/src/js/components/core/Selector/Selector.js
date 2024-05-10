import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import { SelectorGroupContext } from './SelectorGroup';
import { SelectorHeader } from './SelectorHeader';

// Use box-shadow to increase selected border-width without needing
// to calculate updated pad and avoid layout shift
const StyledBox = styled(Box)`
  ${props =>
    props.selected &&
    `box-shadow: inset 0 0 0 1px ${props.theme.global.colors['green!']};`}
`;

// match focus indicator rounding to container
const StyledButton = styled(Button)`
  border-radius: ${props => props.theme.global.edgeSize.xsmall};
`;

const Selector = ({ value, children, title, icon, description, ...rest }) => {
  const { selectedValue, handleToggle } = useContext(SelectorGroupContext);

  const selected = Array.isArray(selectedValue)
    ? selectedValue.includes(value)
    : value === selectedValue;

  return (
    <StyledButton
      // tabIndex={selected ? '0' : '-1'}
      aria-pressed={selected}
      onClick={e => handleToggle(e, value)}
      {...rest} // TO DO where should rest go?
    >
      <StyledBox
        border={{
          color: selected ? 'brand' : 'border',
        }}
        overflow="hidden"
        round="xsmall"
        selected={selected}
        fill
      >
        <SelectorHeader
          title={title}
          icon={icon}
          description={description}
          selected={selected}
        />
        {/* TO DO full width background? */}
        {children && (
          <Box pad={{ horizontal: 'small', bottom: 'small' }}>{children}</Box>
        )}
      </StyledBox>
    </StyledButton>
  );
};

Selector.propTypes = {
  value: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  icon: PropTypes.element,
  description: PropTypes.string,
  title: PropTypes.string,
};

export { Selector };
