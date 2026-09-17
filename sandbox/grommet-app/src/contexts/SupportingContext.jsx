// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createContext } from 'react';

export const SupportingContext = createContext({
  showSupporting: false,
  // eslint-disable-next-line no-unused-vars
  setShowSupporting: nextValue => {},
});
