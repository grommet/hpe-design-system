/* eslint-disable react/prop-types */
import { useContext } from 'react';
import styled from 'styled-components';
import { Box, Button } from 'grommet';
import { SelectorGroupContext } from './SelectorGroupContext';
import { SelectorHeader } from './SelectorHeader';

// Use box-shadow to increase selected border-width without needing
// to calculate updated pad and avoid layout shift

// added the hover background color which we can discuss
const StyledBox = styled(Box)`
  ${props =>
    props.selected &&
    `
      box-shadow: inset 0 0 0 1px ${props.theme.global.colors['green!']};
    `}

  &:hover {
    ${props =>
      props.selected &&
      `
        background: #aafade;
      `}
  }
`;

// match focus indicator rounding to container
const StyledButton = styled(Button)`
  border-radius: ${props => props.theme.global.edgeSize[props.round]};
`;

const Selector = ({
  value,
  title,
  icon,
  indicator,
  direction,
  description,
  round = 'xsmall',
  pad,
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
          color: selected ? 'brand' : 'border',
        }}
        // having the selected green background is not enough
        // to indicate selected state for accessibility
        // so we need to look at what else we can do
        background={selected ? 'background-selected-primary' : undefined}
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
      </StyledBox>
    </StyledButton>
  );
};

export { Selector };
