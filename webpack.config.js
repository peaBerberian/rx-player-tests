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
          presets: ["es2015", "es2016", "es2017"],
        },
      },
    ],
  },
  stats: { colors: true },
};
