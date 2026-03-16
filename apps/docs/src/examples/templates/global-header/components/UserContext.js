import React from 'react';

export const UserContext = React.createContext({
  user: {},
  setUser: () => {},
});

export const defaultUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@hpe.com',
  image: '//s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80',
};
