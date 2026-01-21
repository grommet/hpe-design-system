/**
 * Process raw-loader output to extract clean source code
 * raw-loader wraps content in `export default "..."` so we need to parse it
 */
export function processRawSource(rawSourceCode) {
  if (rawSourceCode.startsWith('export default "')) {
    return JSON.parse(rawSourceCode.slice('export default '.length, -1));
  }
  return rawSourceCode;
}
