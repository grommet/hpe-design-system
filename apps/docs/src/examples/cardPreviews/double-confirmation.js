import {
  Box,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Heading,
  Paragraph,
} from 'grommet';
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
    <Card ref={ref} elevation="none" width="small">
      <CardHeader pad={{ horizontal: 'small', vertical: 'small' }}>
        <Box gap="3xsmall">
          <Heading level={2} margin="none" size="xsmall">
            Discard Changes?
          </Heading>
          <Paragraph margin="none">Your changes will not be applied.</Paragraph>
        </Box>
      </CardHeader>
      <CardFooter pad={{ top: 'none', bottom: 'small', horizontal: 'small' }}>
        <Box fill direction="row" gap="xsmall" justify="end">
          <Button label="Cancel" />
          <Button label="Discard" primary />
        </Box>
      </CardFooter>
    </Card>
  );
};
