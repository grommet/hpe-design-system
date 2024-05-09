import React, {
  useState,
  useCallback,
  Children,
  forwardRef,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'grommet';

export const SelectorGroupContext = React.createContext({});

const SelectorGroup = forwardRef(
  ({ children, defaultValue, multiple, onSelect, value, ...rest }) => {
    // TO DO rename to "selected", "setSelected"? or "value", "setValue"
    const [selectedValue, setSelectedValue] = useState(null);

    const totalChildren = Children.count(children);

    const getFocusableIndex = useCallback(() => {
      let defaultIndex = 0;
      if (value?.length) {
        // set earliest button that's part of value to active
        // assume that value might not be ordered the same as options
        defaultIndex = value.indexOf(
          value.find(option => selectedValue === option),
        );
      }
      return defaultIndex;
    }, [value, selectedValue]);

    // Compute the focusable index
    const focusableIndex = useMemo(
      () => getFocusableIndex(),
      [selectedValue, getFocusableIndex],
    );

    const handleToggle = (event, option) => {
      const adjustedEvent = event;
      let nextValue;
      if (!multiple) {
        nextValue = option;
      } else {
        nextValue = value.includes(option)
          ? value.filter(item => item !== option)
          : [...value, option];
      }
      adjustedEvent.value = nextValue;
      setValue(adjustedEvent);
    };

    // Create the context value
    const contextValue = useMemo(
      () => ({
        multiple,
        defaultValue,
        onSelect,
        value,
        selectedValue,
        setSelectedValue,
      }),
      [
        multiple,
        defaultValue,
        onSelect,
        value,
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

SelectorGroup.PropTypes = {
  children: PropTypes.element,
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
