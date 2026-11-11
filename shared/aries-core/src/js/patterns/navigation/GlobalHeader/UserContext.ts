// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createContext, useContext } from 'react';
import type { SetStateAction } from 'react';

export type User = {
  firstName: string;
  lastName?: string;
  email: string;
  image?: string;
};

export type UserContextValue = {
  user: User | undefined;
  setUser: (value?: SetStateAction<User | undefined>) => void;
};

export const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useHeaderUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('Header user controls require a UserContext.Provider');
  }
  return context;
};
