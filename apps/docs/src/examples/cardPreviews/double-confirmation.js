import {
  Box,
  Button,
  Card,
  CardBody,
  Footer,
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
    <div ref={ref}>
      <Box background="background-back" pad="medium">
        <Card alignSelf="center" round="medium" elevation="none" width="small">
          <CardBody pad="medium" gap="none">
            <Box gap="3xsmall">
              <Heading level={2} margin="none" size="xsmall">
                Discard Changes?
              </Heading>
              <Paragraph margin="none">
                Your changes will not be applied.
              </Paragraph>
            </Box>
            <Footer direction="row" gap="xsmall" justify="end">
              <Button label="Cancel" />
              <Button label="Discard" primary />
            </Footer>
          </CardBody>
        </Card>
      </Box>
    </div>
  );
};
