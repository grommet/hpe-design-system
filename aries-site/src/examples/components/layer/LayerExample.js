import React, { useContext, useState } from 'react';
import { Button, Box, Heading, Layer, ResponsiveContext } from 'grommet';
import { LayerForm } from './ConfigurationForm';

export const LayerExample = () => {
  const [open, setOpen] = useState(false);
  const breakpoint = useContext(ResponsiveContext);

  return (
    <>
      <Box align="start">
        <Button
          label="Show me the layer"
          onClick={() => setOpen(true)}
          primary
        />
      </Box>
      {open && (
        <Layer
          position="right"
          full={['xsmall', 'small'].includes(breakpoint) ? true : 'vertical'}
          onEsc={() => setOpen(false)}
        >
          <Box pad="medium" gap="medium" overflow="auto">
            <Heading level={2} size="small" margin="none">
              Add application
            </Heading>
            <Box>
              <LayerForm setOpen={setOpen} />
            </Box>
            <Box direction="row" gap="small" flex={false}>
              <Button
                label="Add application"
                primary
                type="submit"
                form="application-form"
              />
              <Button label="Cancel" onClick={() => setOpen(false)} />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
