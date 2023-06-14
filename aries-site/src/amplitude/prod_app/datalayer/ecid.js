/* eslint-disable prefer-destructuring */

export function fetchECID (window, log) {
  let ecid = false;
  try {
    ecid = decodeURIComponent(/s_ecid=([^;\s]+)/.exec(window.document.cookie)[1]).split('|')[1];
    log.success(`Completed setting ECID (s_ecid-cookie): ${ecid}`);
  } catch (e) {
    try {
      ecid = /AMCV_56B5A25055667EED7F000101%40AdobeOrg=MCMID\|(\d+)/i.exec(window.document.cookie)[1];
      log.success(`Completed setting ECID (legacy-cookie): ${ecid}`);
    } catch (ex) {
      ecid = false;
      // eslint-disable-next-line max-len
      log.warn(`Issue with fetching ECID (s_ecid / legacy-cookie): ${JSON.stringify(ex)}`);
    }
  }
  return ecid;
}
