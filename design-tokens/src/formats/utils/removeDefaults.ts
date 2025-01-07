/**
 * @description Removes "DEFAULT" and "REST" from css variable output
 * @example <caption>Passing input as css variable output</caption>
 * // Returns '--var(hpe-color-background-critical): --var(hpe-base-color-red-600);'
 * removeDefaults('--var(hpe-color-background-critical-DEFAULT-REST): --var(hpe-base-color-red-600);')
 */
export const removeDefaults = (input: string) => {
  let result = input;
  // "DEFAULT" and "REST" should not be part of output
  result = result.replace(/-DEFAULT/g, '');
  result = result.replace(/-REST/g, '');
  return result;
};
