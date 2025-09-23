import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from 'grommet';

export const SelectorGroupContext = React.createContext({});

const useControlled = ({ prop, defaultProp, onChange = () => {} }) => {
  const [uncontrolledProp, setUncontrolledProp] = useState(defaultProp);
  const controlled = prop !== undefined;
  const value = controlled ? prop : uncontrolledProp;
  const handleChange = useCallback(onChange, [onChange]);

  const setValue = useCallback(
    event => {
      // only update internal value in uncontrolled cases
      if (!controlled) {
        setUncontrolledProp(event.value);
      }
      handleChange(event);
    },
    [controlled, setUncontrolledProp, handleChange],
  );

  return [value, setValue];
};

const SelectorGroup = ({
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
      if (!multiple) {
        nextValue = option === selectedValue ? '' : option;
      } else {
        nextValue = selectedValue.includes(option)
          ? selectedValue.filter(item => item !== option)
          : [...selectedValue, option];
      }
      adjustedEvent.value = nextValue;
      setSelectedValue(adjustedEvent);
    },
    [multiple, selectedValue, setSelectedValue],
  );

  const contextValue = useMemo(
    () => ({
      multiple,
      defaultValue,
      onSelect,
      value,
      selectedValue,
      setSelectedValue,
      handleToggle,
    }),
    [
      multiple,
      defaultValue,
      onSelect,
      value,
      selectedValue,
      setSelectedValue,
      handleToggle,
    ],
  );

  return (
    <SelectorGroupContext.Provider value={contextValue}>
      {layout === 'grid' && (
        <Grid
          columns={{
            count: 'fit',
            size: ['xsmall', 'flex'],
          }}
          gap="xsmall"
          role="group"
          {...rest}
        >
          {children}
        </Grid>
      )}
      {layout === 'fit' && (
        <Box role="group" direction="row" gap="3xsmall" wrap {...rest}>
          {children}
        </Box>
      )}
    </SelectorGroupContext.Provider>
  );
};

SelectorGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  multiple: PropTypes.bool,
  onSelect: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  layout: PropTypes.oneOf(['grid', 'fit']),
};

export { SelectorGroup };
