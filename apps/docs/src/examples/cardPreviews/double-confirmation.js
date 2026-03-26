import { Button, Box, Heading, Paragraph } from 'grommet';
import { useEffect, useRef } from 'react';

export const DoubleConfirmationPreview = () => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const buttons = ref.current.querySelectorAll('button, input');
      buttons.forEach(button => {
        button.setAttribute('tabindex', '-1');
      });
    }
  }, []);

  return (
    <Box
      ref={ref}
      background="background-front"
      round="medium"
      pad="medium"
      width="small"
    >
      <Box gap="3xsmall">
        <Heading level={2} margin="none" size="xsmall">
          Discard changes?
        </Heading>
        <Paragraph margin="none">Your changes will not be applied.</Paragraph>
      </Box>

      <Box direction="row" gap="xsmall" justify="end">
        <Button label="Cancel" />
        <Button label="Discard" primary />
      </Box>
    </Box>
  );
};
