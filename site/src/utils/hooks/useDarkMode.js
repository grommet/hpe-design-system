import { useEffect, useCallback, useMemo } from 'react';
import { initialize, useEventListener } from '..';

// The following code is coming from https://github.com/donavon/use-dark-mode.
// Instead of importing we opted to just include it in our files.
// The purpose of this hook in general is to allow the themeMode to persist
// in localStorage.
// without it, sometimes the themeMode would glitch from light to dark or
// not persist when you routed to a new page/opened in new tab
export const useDarkMode = (
  initialValue = true,
  {
    element,
    classNameDark,
    classNameLight,
    onChange,
    storageKey = 'darkMode',
    storageProvider,
    global,
  } = {},
) => {
  const {
    usePersistedDarkModeState,
    getDefaultOnChange,
    getInitialValue,
    mediaQueryEventTarget,
  } = useMemo(() => initialize(storageKey, storageProvider, global), [
    storageKey,
    storageProvider,
    global,
  ]);

  const [state, setState] = usePersistedDarkModeState(
    getInitialValue(initialValue),
  );

  const stateChangeCallback = useMemo(
    () =>
      onChange || getDefaultOnChange(element, classNameDark, classNameLight),
    [onChange, element, classNameDark, classNameLight, getDefaultOnChange],
  );

  // Call the onChange handler
  useEffect(() => {
    stateChangeCallback(state);
  }, [stateChangeCallback, state]);

  // Listen for media changes and set state.
  useEventListener(
    'change',
    ({ matches }) => setState(matches),
    mediaQueryEventTarget,
  );

  return {
    value: state,
    enable: useCallback(() => setState(true), [setState]),
    disable: useCallback(() => setState(false), [setState]),
    toggle: useCallback(() => setState(current => !current), [setState]),
  };
};
