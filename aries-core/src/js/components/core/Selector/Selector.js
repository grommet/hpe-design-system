import React, {
  forwardRef,
  useContext,
  useCallback,
  useRef,
  useState,
} from 'react';
import { Box, Button, Keyboard } from 'grommet';
import { SelectorGroupContext } from './SelectorGroup';

const Selector = ({ value, selected, onClick, focusableIndex, children }) => {
  const { selectedValue, multiple, onSelect, setSelectedValue } =
    useContext(SelectorGroupContext);
  //   const buttonRefs = useRef([]);

  // Handle click event
  const handleClick = () => {
    if (multiple) {
      // add logic
    } else {
      const newValue = value === selectedValue ? null : value;
      setSelectedValue(newValue);
      onSelect && onSelect(newValue);
    }
  };

  console.log('',focusableIndex);


//   const onNext = (e) => {
//     // prevent page scroll
//     e.preventDefault();
//     const nextIndex =
//       focusableIndex + 1 <= options.length - 1 ? focusableIndex + 1 : 0;
//     setFocusableIndex(nextIndex);
//     buttonRefs.current[nextIndex].focus();
//   };

//   const onPrevious = (e) => {
//     // prevent page scroll
//     e.preventDefault();
//     const nextIndex =
//       focusableIndex - 1 >= 0 ? focusableIndex - 1 : options.length - 1;
//     setFocusableIndex(nextIndex);
//     buttonRefs.current[nextIndex].focus();
//   };

  return (
    <Keyboard
    //   onUp={onPrevious}
    //   onDown={onNext}
    //   onLeft={onPrevious}
    //   onRight={onNext}
    >
      <Button
        // tabIndex={selected ? '0' : '-1'}
        aria-pressed={selected}
        onClick={handleClick}
      >
        <Box
          border={{
            color: selected ? 'brand' : 'border',
          }}
          overflow="hidden"
          round="xsmall"
          fill
        >
          {children}
        </Box>
      </Button>
    </Keyboard>
  );
};

export { Selector };
