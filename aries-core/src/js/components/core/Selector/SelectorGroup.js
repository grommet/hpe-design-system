import React, {
  cloneElement,
  useState,
  useCallback,
  Children,
  forwardRef,
  useMemo,
} from 'react';
import { Box } from 'grommet';

export const SelectorGroupContext = React.createContext({});

const SelectorGroup = forwardRef(
  ({ children, defaultValue, multiple, onSelect, value, ...rest }) => {
    const [selectedValue, setSelectedValue] = useState(null);

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

    const handleToggle = value => {
      setSelectedValue(value);
    };

    // Clone children and pass props to each Toggle component
    const clonedChildren = React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return cloneElement(child, {
          selected: child.props.value === selectedValue,
          onClick: () => setSelectedValue(child.props.value),
          focusableIndex: focusableIndex,
        });
      }
      return child;
    });

    return (
      <SelectorGroupContext.Provider value={contextValue}>
        {/* // should we include grid here? */}
        <div role="group">{clonedChildren}</div>
      </SelectorGroupContext.Provider>
    );
  },
);

export { SelectorGroup };
