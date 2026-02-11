import { useState } from 'react';
import { createStorage, usePersistedState } from '.';

export const createPersistedState = (key, provider = global.localStorage) => {
  if (provider) {
    const storage = createStorage(provider);
    return initialState => usePersistedState(initialState, key, storage);
  }
  return useState;
};
