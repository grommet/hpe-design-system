import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import {
  LayerHeader,
  ModalBody,
  ModalContainer,
  ModalFooter,
} from '@shared/aries-core';

export const ActionLabelTitle = ({ bestPractice = true }) => (
  <ModalContainer elevation="large">
    <LayerHeader title='Create pipeline' />
    <ModalBody pad="medium" border={{ style: 'dashed' }} round="small">
      Body content goes here.
    </ModalBody>
    <ModalFooter gap="xsmall" justify="end">
      <Button label="Cancel" />
      <Button label={`${bestPractice ? 'Create' : 'Add'} pipeline`} primary />
    </ModalFooter>
  </ModalContainer>
);

ActionLabelTitle.propTypes = {
  bestPractice: PropTypes.bool,
};
