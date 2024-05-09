import React, {
  cloneElement,
  useState,
  useCallback,
  Children,
  forwardRef,
  useMemo,
} from 'react';
import { Box, Grid } from 'grommet';

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

    return (
      <SelectorGroupContext.Provider value={contextValue}>
        <Grid>
          <div role="group">{children}</div>
        </Grid>
      </SelectorGroupContext.Provider>
    );
  },
);

export { SelectorGroup };
