// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// eslint-disable-next-line react/prop-types
export const Button = ({ label, kind = 'default', ...rest }) => {
  return (
    <button type="button" className={`hpe-button-${kind}`} {...rest}>
      {label}
    </button>
  );
};
