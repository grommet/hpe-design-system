import { createReactViteTsConfig } from '../sharable-configs/react-vite-ts.mjs';

export const createReactViteTsRules = ({ files } = {}) => [
  ...createReactViteTsConfig({ files }),
];
