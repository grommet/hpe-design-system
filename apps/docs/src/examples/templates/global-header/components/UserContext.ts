// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  createContext,
  type SetStateAction,
} from 'react';

export const defaultUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@hpe.com',
};

export type User = typeof defaultUser;

type UserContextValue = {
  user: Partial<User> | undefined;
  setUser: (value?: SetStateAction<User | undefined>) => void;
};

export const UserContext = createContext<UserContextValue>({
  user: {},
  setUser: () => {},
});