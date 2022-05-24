export const groupActions = (actions, breakpoint, bestPractice) => {
  let collapsedActions;
  let displayedActions;
  // collapse all default/secondary actions
  if (breakpoint === 'medium') {
    collapsedActions = actions.filter(action => !action.primary);
    displayedActions = actions.filter(action => action.primary);
    // only leave primary action visible
  } else if (['xsmall', 'small'].includes(breakpoint)) {
    collapsedActions = actions.filter(action =>
      bestPractice ? !action.primary : action.primary,
    );
    // primary action should render as child of PageHeader
    displayedActions = [];
  } else displayedActions = actions;

  return [collapsedActions, displayedActions];
};
