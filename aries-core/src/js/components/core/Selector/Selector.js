import React, { useContext } from 'react';
import { Box, Button, Keyboard } from 'grommet';
import { SelectorGroupContext } from './SelectorGroup';
import { SelectorHeader } from './SelectorHeader';

const Selector = ({ value, children, title, icon, description }) => {
  const { selectedValue, handleSelector, multiple } =
    useContext(SelectorGroupContext);

  const handleClick = event => {
    handleSelector(value);
  };

  return (
    <Button
      aria-pressed={selectedValue === value}
      onClick={handleClick}
    >
      <Box
        border={{
          color: selectedValue === value ? 'brand' : 'border',
        }}
        overflow="hidden"
        round="xsmall"
        fill
      >
        <SelectorHeader
          title={title}
          icon={icon}
          description={description}
          selected={selectedValue}
        />
        <Box pad="small">{children}</Box>
      </Box>
    </Button>
  );
};

export { Selector };
