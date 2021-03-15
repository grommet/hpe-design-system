import React from 'react';
import { Box, Button, Layer, Text, Spinner } from 'grommet';

export const ModalSpinnerExample = () => {
  const [open, setOpen] = React.useState();
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);

  const onOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(undefined);
      setIsDataLoaded(true);
    }, 4000);
  };

  return (
    <>
      <Box fill align="center" justify="center" gap="medium">
        {!isDataLoaded && <Button label="Load Server" onClick={onOpen} />}
        {isDataLoaded && (
          <Box align="center" gap="small">
            <Text>Server is now loaded</Text>
          </Box>
        )}
      </Box>
      {open && (
        <Layer>
          <Box
            align="center"
            justify="center"
            gap="small"
            direction="row"
            alignSelf="center"
            pad="large"
          >
            <Spinner message="loading server"></Spinner>
            <Text>Loading...</Text>
          </Box>
        </Layer>
      )}
    </>
  );
};
