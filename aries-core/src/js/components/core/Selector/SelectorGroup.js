import React, { useState, useCallback, Children, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, ThemeContext } from 'grommet';

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

  const totalChildren = Children.count(children);

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
    <ThemeContext.Extend
      // theme overrides to remove excess padding
      value={{
        checkBox: { pad: 'none' },
        radioButton: {
          hover: {
            background: 'none',
          },
          container: {
            extend: '',
          },
          extend: '',
        },
      }}
    >
      <SelectorGroupContext.Provider value={contextValue}>
        <Grid
          columns={{
            count: Math.min(4, totalChildren),
            size: ['auto', 'medium'],
          }}
          gap="small"
          role="group"
          {...rest}
        >
          {children}
        </Grid>
      </SelectorGroupContext.Provider>
    </ThemeContext.Extend>
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
};

export { SelectorGroup };
