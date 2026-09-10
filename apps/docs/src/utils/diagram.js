// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export const connection = (fromTarget, toTarget, direction, type) => ({
  anchor: direction || 'horizontal',
  type: type || 'direct',
  color: 'border',
  thickness: 'hair',
  fromTarget,
  toTarget,
});
