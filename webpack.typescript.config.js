const path = require('path');

module.exports = {
  mode: "production",
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.typescript.js',
    path: path.resolve(__dirname, 'build'),
  },
};
