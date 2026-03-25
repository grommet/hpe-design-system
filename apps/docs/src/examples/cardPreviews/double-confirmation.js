import {
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
    <Card ref={ref} elevation="none" width="small" pad="medium">
      <CardHeader align="start" direction="column" gap="3xsmall" pad="none">
        <Heading level={2} margin="none" size="xsmall">
          Discard changes?
        </Heading>
        <Paragraph margin="none">Your changes will not be applied.</Paragraph>
      </CardHeader>
      <CardFooter pad="none" gap="xsmall" justify="end">
        <Button label="Cancel" />
        <Button label="Discard" primary />
      </CardFooter>
    </Card>
  );
};
