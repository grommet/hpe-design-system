import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { ModalDialog, ModalFooter } from '@shared/aries-core';
import { useConfirmation } from './ConfirmationContext';

export const DoubleConfirmation = ({ title }) => {
  const { acceptConfirmation, cancelConfirmation } = useConfirmation();
  return (
    <ModalDialog
      title={`Discard ${title}?`}
      subtitle="Your changes will not be applied."
      onEsc={cancelConfirmation}
    >
      <ModalFooter>
        <Button label="Cancel" onClick={cancelConfirmation} />
        <Button label="Discard" primary onClick={acceptConfirmation} />
      </ModalFooter>
    </ModalDialog>
  );
};
DoubleConfirmation.propTypes = {
  title: PropTypes.string,
};
