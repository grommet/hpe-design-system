import React, { useEffect, useRef, useState } from 'react';
import { Box, Drop, Text } from 'grommet';

export const DropExample = () => {
  const targetRef = useRef();

  const [, setShowDrop] = useState(false);
  useEffect(() => {
    setShowDrop(true);
  }, []);

  return (
    <>
      <Box
        background="background-front"
        pad="medium"
        align="center"
        justify="start"
        ref={targetRef}
      >
        <Text color="text-strong">Target</Text>
      </Box>
      {targetRef.current && (
        <Drop
          align={{ top: 'bottom', left: 'left' }}
          target={targetRef.current}
          trapFocus={false}
        >
          <Box pad="xlarge">Drop Contents</Box>
        </Drop>
      )}
    </>
  );
};
