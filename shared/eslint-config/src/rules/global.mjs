import { ignoredFolders } from '../utils.mjs';
import { createBaseConfig } from '../sharable-configs/base.mjs';

export const createGlobalRules = ({ ignorePatterns = [] } = {}) => [
  ignoredFolders,
  ...createBaseConfig({ ignorePatterns }),
];
