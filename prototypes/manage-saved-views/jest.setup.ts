import "@testing-library/jest-dom";

jest.mock('./src/config', () => ({
  config: {
    loginCredential: 'mock',
    loginKey: 'mock',
  },
}));