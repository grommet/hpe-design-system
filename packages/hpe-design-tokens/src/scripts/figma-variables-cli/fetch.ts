import FigmaApi from '../../figma_api.js';
import type { SourceType } from './types.js';

export async function fetchVariablesBySource(
  api: FigmaApi,
  fileKey: string,
  sourceType: SourceType,
) {
  return sourceType === 'local'
    ? api.getLocalVariables(fileKey)
    : api.getPublishedVariables(fileKey);
}
