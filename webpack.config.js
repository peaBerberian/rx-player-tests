const path = require("path");

module.exports = {
mode: "production",
entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
    ],
  },
  stats: { colors: true },
};
