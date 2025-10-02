import { createContext } from 'react';

export const SupportingContext = createContext({
  showSupporting: false,
  // eslint-disable-next-line no-unused-vars
  setShowSupporting: nextValue => {},
});
