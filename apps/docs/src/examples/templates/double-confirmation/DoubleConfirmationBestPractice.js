import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { LayerHeader, ModalContainer, ModalFooter } from '@shared/aries-core';

export const DoubleConfirmationBestPractice = ({ bestPractice = true }) => (
  // applying elevation here to visually replicate Layer styling
  // since this is presented in a Do-Dont example where we don't
  // want to use Layer directly.
  <ModalContainer elevation="large">
    <LayerHeader
      title={
        bestPractice
          ? 'Discard application?'
          : 'Are you sure you want to do this?'
      }
      subtitle="Your changes will not be applied."
    />
    <ModalFooter>
      <Button label="Cancel" />
      <Button
        label={bestPractice !== 'badLabel' ? 'Discard' : 'Yes'}
        primary
      />
    </ModalFooter>
  </ModalContainer>
);

DoubleConfirmationBestPractice.propTypes = {
  bestPractice: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['badLabel']),
  ]),
};