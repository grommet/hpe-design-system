const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    grommet: 'Grommet',
    'grommet-icons': 'GrommetIcons',
    'styled-components': 'styled',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'aries-core.min.js',
    libraryTarget: 'var',
    library: 'Aries',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
