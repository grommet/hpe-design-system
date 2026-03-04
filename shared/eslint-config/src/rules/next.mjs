import { createNextConfig } from '../sharable-configs/next.mjs';

export const createNextRules = ({ files } = {}) => [
  ...createNextConfig({ files }),
];
