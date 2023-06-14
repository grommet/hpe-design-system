import { AMPLITUDE_BUILD } from '../../build_config';
import { fetchECID } from './ecid';
import { buildPageDatalayer } from './page';
import { jumpidGetter } from './jumpid';

export function buildDatalayerCommon (window, log) {
  // ECID logic
  let ecid = false;
  try {
    ecid = window.digitalData.user.ecid;
  } catch (e) { /* empty */ }
  ecid = ecid || fetchECID(window, log);
  const internal = jumpidGetter(window);

  const template = {
    page: buildPageDatalayer(window),
    diagnostics: {
      amplitude_version: `amplitude-dl:${AMPLITUDE_BUILD}`,
    },
    user: { ecid },
  };
  if (internal) {
    template.promotion = { internal };
  }
  // Return final data layer
  const rval = JSON.parse(JSON.stringify(template));
  return rval;
}

export function logDataLayer (log, dataLayer) {
  // eslint-disable-next-line max-len
  log.info(`***DATALAYER:\n=====================================================\n${JSON.stringify(dataLayer, null, 2)}\n=====================================================`);
}
