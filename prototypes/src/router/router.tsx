interface ModuleImportInterface {
  [key: string]: {
    default: React.ComponentType<unknown>;
    loader?: () => Promise<unknown>;
    action?: () => void;
    ErrorBoundary?: React.ComponentType<unknown>
  };
}

const pages: ModuleImportInterface = import.meta.glob(['../pages/**/*.jsx', '../pages/**/*.tsx'], { eager: true });

const routes = [];

for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.(jsx|tsx)$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes('$')
    ? fileName.replace('$', ':')
    : fileName.replace(/\/index/, '');

  // Only include files named as index as routes
  if (fileName.includes('index')) {
    routes.push({
      path: fileName === 'index' ? '/' : `/${normalizedPathName.toLowerCase()}`,
      Element: (pages[path]).default,
      loader: pages[path]?.loader,
      action: pages[path]?.action,
      ErrorBoundary: pages[path]?.ErrorBoundary,
    });
  }
}

const router = routes.map(({ Element, ErrorBoundary, ...rest }) => ({
  ...rest,
  element: Element && <Element />,
  ...(ErrorBoundary && {
    errorElement: <ErrorBoundary />
  }),
}));

export { router };