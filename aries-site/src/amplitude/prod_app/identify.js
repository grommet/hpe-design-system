export function getIdentity (alloy, log) {
  return alloy('getIdentity')
    .then((result) => {
    // The command succeeded.
      log.info('ECID:', result.identity.ECID);
      log.info('RegionId:', result.edge.regionId);
    })
    .catch((error) => {
      log.error(`Error: getIdentity, ${error}`);
    });
}
