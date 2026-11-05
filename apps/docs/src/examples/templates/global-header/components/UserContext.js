// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

export const UserContext = React.createContext({
  user: {},
  setUser: () => {},
});

export const defaultUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@hpe.com',
};
