const path = require("path");

module.exports = {
mode: "production",
entry: "./js/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: [],
        },
      },
    ],
  },
  stats: { colors: true },
};
