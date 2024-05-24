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

const Selector = ({
  value,
  children,
  title,
  icon,
  plain,
  description,
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
      {...rest}
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
          plain={plain}
          title={title}
          icon={icon}
          description={description}
          selected={selected}
        />
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
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  icon: PropTypes.element,
  plain: PropTypes.bool,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  title: PropTypes.string,
};

export { Selector };
