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
    // eslint-disable-next-line max-len
    `box-shadow: inset 0 0 0 1px ${props.theme.global.colors['border-selected']};`}
`;

// match focus indicator rounding to container
const StyledButton = styled(Button)`
  border-radius: ${props => props.theme.global.edgeSize[props.round]};
`;

const Selector = ({
  value,
  children,
  title,
  icon,
  indicator,
  direction,
  description,
  round = 'xsmall',
  pad = 'small',
  ...rest
}) => {
  const { selectedValue, handleToggle } = useContext(SelectorGroupContext);

  const selected = Array.isArray(selectedValue)
    ? selectedValue.includes(value)
    : value === selectedValue;

  return (
    <StyledButton
      aria-pressed={selected}
      onClick={e => handleToggle(e, value)}
      round={round}
      {...rest}
    >
      <StyledBox
        fill
        overflow="hidden"
        pad={pad}
        round={round}
        selected={selected}
        gap="xsmall"
        border={{
          color: selected ? 'border-selected' : 'border',
        }}
      >
        {(indicator !== false || title || description || icon) && (
          <SelectorHeader
            direction={direction}
            indicator={indicator}
            title={title}
            icon={icon}
            description={description}
            selected={selected}
          />
        )}
        {children}
      </StyledBox>
    </StyledButton>
  );
};

Selector.propTypes = {
  value: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  icon: PropTypes.element,
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  direction: PropTypes.oneOfType([PropTypes.oneOf(['row', 'column'])]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  title: PropTypes.string,
  round: PropTypes.string,
  pad: PropTypes.string,
};

export { Selector };
