// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export const ScreenReaderOnly: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  return (
    <span
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        margin: '-1px',
        padding: '0',
        overflow: 'hidden',
        clipPath: 'inset(50%)',
        border: '0',
      }}
    >
      {children}
    </span>
  );
};
