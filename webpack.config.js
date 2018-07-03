const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
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
          presets: [
            [ "es2015", { loose: true, modules: false } ],
            "es2016",
            "es2017"
          ],
        },
      },
    ],
  },
  plugins: [new BundleAnalyzerPlugin()],
  stats: { colors: true },
};
