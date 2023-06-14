/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
export function setupFakeLog (window) {
  const logf = () => {};
  window._analyticsFakeLog = {
    assert: logf,
    clear: logf,
    count: logf,
    countReset: logf,
    debug: logf,
    dir: logf,
    dirxml: logf,
    error: logf,
    group: logf,
    groupCollapsed: logf,
    groupEnd: logf,
    info: logf,
    log: logf,
    profile: logf,
    profileEnd: logf,
    success: logf,
    table: logf,
    time: logf,
    timeEnd: logf,
    timeLog: logf,
    timeStamp: logf,
    trace: logf,
    warn: logf,
  };
  return window._analyticsFakeLog;
}
