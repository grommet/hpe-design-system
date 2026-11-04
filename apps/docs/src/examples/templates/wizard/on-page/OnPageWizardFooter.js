// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, ResponsiveContext } from 'grommet';
import { LinkNext, LinkPrev } from '@hpe-design/icons-grommet';
import { ButtonGroup } from '@shared/aries-core';

// The footer sits below the step's inputs, not inside them. Buttons are
// ordered by importance in relation to their alignment: default, secondary,
// then primary when right-aligned, and the reverse when left-aligned. Because
// the submit button lives outside the form element, it is associated with the
// form by id. On the smallest screens the buttons stack, in the same order, so
// that none of the labels have to wrap.
export const OnPageWizardFooter = ({
  activeIndex,
  finishLabel,
  formId,
  isLastStep,
  justify = 'end',
  onCancel,
  onPrevious,
  ...rest
}) => {
  const size = useContext(ResponsiveContext);
  const buttons = [
    <Button key="cancel" label="Cancel" onClick={onCancel} />,
    <Button
      key="previous"
      label="Previous"
      icon={<LinkPrev />}
      onClick={onPrevious}
      disabled={activeIndex === 0}
      secondary
    />,
    <Button
      key="next"
      label={isLastStep ? finishLabel : 'Next'}
      icon={isLastStep ? undefined : <LinkNext />}
      form={formId}
      type="submit"
      primary
      reverse
    />,
  ];

  return (
    <ButtonGroup
      direction={size === 'xsmall' ? 'column' : 'row'}
      gap="xsmall"
      justify={justify}
      {...rest}
    >
      {justify === 'start' ? buttons.reverse() : buttons}
    </ButtonGroup>
  );
};

OnPageWizardFooter.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  finishLabel: PropTypes.string.isRequired,
  formId: PropTypes.string.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  justify: PropTypes.oneOf(['start', 'end']),
  onCancel: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};
