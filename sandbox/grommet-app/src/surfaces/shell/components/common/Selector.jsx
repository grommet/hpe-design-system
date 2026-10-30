// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, Grid, Text, ThemeContext } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import { Checkmark } from '@hpe-design/icons-grommet';

// Ported from @shared/aries-core Selector / SelectorGroup so the prototype
// stays self-contained. Transient ($) props keep styling flags off the DOM.

const SelectorGroupContext = createContext({});

const useControlled = ({ prop, defaultProp, onChange = () => {} }) => {
  const [uncontrolledProp, setUncontrolledProp] = useState(defaultProp);
  const controlled = prop !== undefined;
  const value = controlled ? prop : uncontrolledProp;
  const setValue = useCallback(
    event => {
      if (!controlled) setUncontrolledProp(event.value);
      onChange(event);
    },
    [controlled, onChange],
  );
  return [value, setValue];
};

export const SelectorGroup = ({
  children,
  defaultValue,
  layout = 'grid',
  multiple,
  onSelect,
  value,
  ...rest
}) => {
  const [selectedValue = multiple ? [] : '', setSelectedValue] = useControlled({
    prop: value,
    defaultProp: defaultValue,
    onChange: onSelect,
  });

  const handleToggle = useCallback(
    (event, option) => {
      const adjustedEvent = event;
      let nextValue;
      if (!multiple) nextValue = option === selectedValue ? '' : option;
      else
        nextValue = selectedValue.includes(option)
          ? selectedValue.filter(item => item !== option)
          : [...selectedValue, option];
      adjustedEvent.value = nextValue;
      setSelectedValue(adjustedEvent);
    },
    [multiple, selectedValue, setSelectedValue],
  );

  const contextValue = useMemo(
    () => ({ multiple, selectedValue, handleToggle }),
    [multiple, selectedValue, handleToggle],
  );

  return (
    <SelectorGroupContext.Provider value={contextValue}>
      {layout === 'grid' ? (
        <Grid
          columns={{ count: 'fit', size: ['xsmall', 'flex'] }}
          gap="xsmall"
          role="group"
          {...rest}
        >
          {children}
        </Grid>
      ) : (
        <Box role="group" direction="row" gap="3xsmall" wrap {...rest}>
          {children}
        </Box>
      )}
    </SelectorGroupContext.Provider>
  );
};

SelectorGroup.propTypes = {
  children: PropTypes.node,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  layout: PropTypes.oneOf(['grid', 'fit']),
  multiple: PropTypes.bool,
  onSelect: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

const SelectorIndicator = ({ selected, indicator }) => {
  const { multiple } = useContext(SelectorGroupContext);
  const theme = useContext(ThemeContext);
  const { round = !multiple ? 'full' : 'xxsmall', size = 'medium' } =
    typeof indicator === 'object' ? indicator : {};
  return (
    <Box
      border={{ color: selected ? 'transparent' : 'border', size: 'xsmall' }}
      round={round}
      height={theme.global.edgeSize[size]}
      width={theme.global.edgeSize[size]}
      justify="center"
      align="center"
      background={selected ? 'background-selected-primary-strong' : undefined}
      flex={false}
    >
      {selected && <Checkmark aria-label="selected" size="small" />}
    </Box>
  );
};

SelectorIndicator.propTypes = {
  selected: PropTypes.bool,
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const SelectorHeader = ({
  direction = 'column',
  icon,
  indicator = true,
  description,
  title,
  selected,
}) => (
  <Box direction="row" gap="3xsmall" flex={false}>
    {direction === 'row' && icon}
    <Box flex>
      <Box gap="3xsmall" flex>
        {direction === 'column' && icon}
        {typeof title === 'string' ? (
          <Text weight={500} wordBreak="break-word">
            {title}
          </Text>
        ) : (
          title
        )}
      </Box>
      {typeof description === 'string' ? (
        <Text>{description}</Text>
      ) : (
        description
      )}
    </Box>
    {indicator && (
      <SelectorIndicator selected={selected} indicator={indicator} />
    )}
  </Box>
);

SelectorHeader.propTypes = {
  direction: PropTypes.oneOf(['row', 'column']),
  icon: PropTypes.element,
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  description: PropTypes.node,
  title: PropTypes.node,
  selected: PropTypes.bool,
};

// Box-shadow widens the selected border without changing pad, so
// selecting an item causes no layout shift.
const StyledBox = styled(Box)`
  ${props =>
    props.$selected &&
    `box-shadow: inset 0 0 0 ${props.theme.global.borderSize.small} ${normalizeColor(
      'border-selected',
      props.theme,
    )};`}
`;

// Match the focus indicator rounding to the container.
const StyledButton = styled(Button)`
  border-radius: ${props => props.theme.global.radius[props.$round]};
`;

export const Selector = ({
  value,
  children,
  title,
  icon,
  indicator,
  direction,
  description,
  round = 'xsmall',
  pad = 'xsmall',
  ...rest
}) => {
  const { selectedValue, handleToggle } = useContext(SelectorGroupContext);
  const selected = Array.isArray(selectedValue)
    ? selectedValue.includes(value)
    : value === selectedValue;

  return (
    <StyledButton
      aria-pressed={selected}
      onClick={event => handleToggle(event, value)}
      $round={round}
      {...rest}
    >
      <StyledBox
        fill
        overflow="hidden"
        pad={pad}
        round={round}
        $selected={selected}
        gap="3xsmall"
        border={{ color: selected ? 'border-selected' : 'border' }}
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
  children: PropTypes.node,
  icon: PropTypes.element,
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  direction: PropTypes.oneOf(['row', 'column']),
  description: PropTypes.node,
  title: PropTypes.node,
  round: PropTypes.string,
  pad: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
