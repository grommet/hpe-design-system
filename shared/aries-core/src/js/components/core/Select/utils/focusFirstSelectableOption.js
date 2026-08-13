// Grommet auto-focuses an option on keyboard-open, but mouse-open can leave
// focus on the listbox container, so we force focus to the first selectable option.
const focusFirstSelectableOption = ({
  root,
  listboxSelector = '[role="listbox"]',
  optionSelector = '[role="option"]:not([aria-disabled="true"])',
  attempt = 0,
  maxAttempts = 10,
} = {}) => {
  const searchRoot =
    root || (typeof document !== 'undefined' ? document : undefined);
  if (!searchRoot) return;

  const listbox = searchRoot.querySelector(listboxSelector);
  const firstSelectableOption = listbox?.querySelector(optionSelector);

  if (firstSelectableOption) {
    firstSelectableOption.focus();
    return;
  }

  if (attempt < maxAttempts) {
    requestAnimationFrame(() =>
      focusFirstSelectableOption({
        root: searchRoot,
        listboxSelector,
        optionSelector,
        attempt: attempt + 1,
        maxAttempts,
      }),
    );
  }
};

export { focusFirstSelectableOption };
