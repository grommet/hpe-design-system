import { useEffect, useRef } from 'react';
import { Button } from 'grommet';
import { LayerHeader, ModalContainer, ModalFooter } from '@shared/aries-core';

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
    // applying elevation here to visually replicate Layer styling
    // since this is presented in a Do-Dont example where we don't
    // want to use Layer directly.
    <ModalContainer
      ref={ref}
      background="background-front"
      elevation="large"
      gap='3xsmall'
      width="small"
    >
      <LayerHeader
        headerGap='3xsmall'
        title='Discard changes?'
        titleSize="xsmall"
        subtitle="Your changes will not be applied."
      />
      <ModalFooter>
        <Button label="Cancel" />
        <Button label="Discard" primary />
      </ModalFooter>
    </ModalContainer>
  );
};
