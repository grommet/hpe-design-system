import React, { useContext } from 'react';
import { Box, Button, Keyboard } from 'grommet';
import { SelectorGroupContext } from './SelectorGroup';
import { SelectorHeader } from './SelectorHeader';

const Selector = ({ value, children, title, icon, description }) => {
  const { selectedValue, multiple, onSelect, setSelectedValue } =
    useContext(SelectorGroupContext);

  // Handle click event
  const handleClick = () => {
    if (multiple) {
      // Implement logic for multiple selection
    } else {
      const newValue = value === selectedValue ? null : value;
      setSelectedValue(newValue);
      if (onSelect) onSelect(newValue);
    }
  };

  const selected = value === selectedValue;

  return (
    <Box
      // behave as button in DOM, but leverage Box styles
      as={Button}
      align="stretch"
      overflow="hidden"
      round="xsmall"
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
        <SelectorHeader
          title={title}
          icon={icon}
          description={description}
          selected={selected}
        />
        {/* TO DO full width background? */}
        <Box pad="small">{children}</Box>
      </Box>
    </Box>
  );
};

export { Selector };
