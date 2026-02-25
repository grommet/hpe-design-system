import { createReactViteConfig } from '../sharable-configs/react-vite.mjs';

export const createReactViteRules = ({ files } = {}) => [
  ...createReactViteConfig({ files }),
];
