import path from 'path';

export default {
  entry: './src/js/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json'],
    fallback: {
      fs: false,
      net: false,
      tls: false,
      zlib: false,
      stream: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
