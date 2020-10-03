const glob = require("glob");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBase = require("./webpack.base");

module.exports = {
  ...webpackBase,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  mode: "development",
  plugins: [
    ...webpackBase.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: "./dist",
    hot: true,
    stats: 'errors-only'
  },
  stats: 'errors-only'
  // devtool: "inline-source-map",
};
