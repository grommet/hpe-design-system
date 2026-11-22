// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import PropTypes from 'prop-types';
import { Notification } from 'grommet';

// Form-level summary of validation errors. Errors are also shown inline on
// each field; this summary tells the user why they could not continue and
// lets them jump to the first field that needs attention.
export const ValidationSummary = ({
  errorCount,
  onClose,
  onGoToFirstError,
  ...rest
}) => (
  <Notification
    actions={[{ label: 'Go to first error', onClick: onGoToFirstError }]}
    message={
      errorCount === 1
        ? 'There is 1 error in this step. Correct it to continue.'
        : `There are ${errorCount} errors in this step. Correct them to ` +
          'continue.'
    }
    onClose={onClose}
    role="alert"
    status="critical"
    {...rest}
  />
);

ValidationSummary.propTypes = {
  errorCount: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onGoToFirstError: PropTypes.func.isRequired,
};
