export const config = {
  loginCredential: import.meta.env.VITE_LOGIN_CREDENTIAL as string,
  loginKey: import.meta.env.VITE_LOGIN_KEY as string,
  routerPages: import.meta.glob(
    ['../pages/**/*.jsx', '../pages/**/*.tsx'],
    { eager: true }) as Record<string,
      {
        default: React.ComponentType<unknown>;
        loader?: () => Promise<unknown>;
        action?: () => void;
        ErrorBoundary?: React.ComponentType<unknown>
      }>,
};

