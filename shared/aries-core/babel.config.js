// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
module.exports = function(api) {
  api.cache(true);

  const presets = [
    '@babel/preset-env', 
    ['@babel/preset-react', {
      "runtime": "automatic"
    }],
    '@babel/preset-typescript'
  ];
  const plugins = ['@babel/plugin-proposal-class-properties'];

  return {
    presets,
    plugins,
  };
};
