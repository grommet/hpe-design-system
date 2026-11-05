// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
};

export type UserContextValue = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};

export const UserContext = createContext<UserContextValue>({
  user: undefined,
  setUser: () => {},
});
