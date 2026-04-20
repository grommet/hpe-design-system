import { Button } from 'grommet';
import { useInert } from '@shared/hooks';
import { LayerHeader, ModalContainer, ModalFooter } from '@shared/aries-core';


export const DoubleConfirmationPreview = () => {
  const ref = useInert();

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
