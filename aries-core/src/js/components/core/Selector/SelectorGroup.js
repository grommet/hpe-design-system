import React, {
  useState,
  useCallback,
  Children,
  forwardRef,
  useMemo,
} from 'react';
import { Grid } from 'grommet';

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

const SelectorGroup = forwardRef(
  ({
    children,
    defaultValue,
    multiple,
    onSelect,
    value: valueProp,
    ...rest
  }) => {
    const [selectedValue = multiple ? [] : '', setSelectedValue] =
      useControlled({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onSelect,
      });
    const totalChildren = Children.count(children);

    const handleSelector = option => {
      if (!multiple) {
        console.log('?????',option);
        // Single selection
        setSelectedValue(option);
      } else {
        // Multiple selection
        setSelectedValue(prevSelected => {
          const isSelected = prevSelected.includes(option);
          if (isSelected) {
            return prevSelected.filter(item => item !== option);
          } else {
            return [...prevSelected, option];
          }
        });
      }
    };
    // Create the context value
    const contextValue = useMemo(
      () => ({
        multiple,
        defaultValue,
        onSelect,
        valueProp,
        selectedValue,
        setSelectedValue,
        handleSelector,
      }),
      [
        multiple,
        defaultValue,
        onSelect,
        valueProp,
        selectedValue,
        setSelectedValue,
      ],
    );

    return (
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
    );
  },
);

export { SelectorGroup };
