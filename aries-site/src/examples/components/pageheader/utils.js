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
      bestPractice ? !action.primary : action,
    );
    displayedActions = actions.filter(action => bestPractice && action.primary);
  } else displayedActions = actions;

  return [collapsedActions, displayedActions];
};
