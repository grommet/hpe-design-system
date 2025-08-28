/* eslint-disable react/prop-types */
import { useState, useCallback, useMemo } from 'react';
import { Box, Grid } from 'grommet';
import { SelectorGroupContext } from './SelectorGroupContext';

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
            count: 4,
            size: 'auto',
          }}
          gap='xsmall'
          role="group"
          {...rest}
        >
          {children}
        </Grid>
      )}
      {layout === 'fit' && (
        <Box role="group" direction="row" gap='3xsmall' wrap {...rest}>
          {children}
        </Box>
      )}
    </SelectorGroupContext.Provider>
  );
};

export { SelectorGroup };
