import { createTypeScriptConfig } from '../sharable-configs/typescript.mjs';

export const createTypeScriptRules = ({ files } = {}) => [
  ...createTypeScriptConfig({ files }),
];
