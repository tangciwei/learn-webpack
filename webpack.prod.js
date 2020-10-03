const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 无法和style-loader共存
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackBase = require('./webpack.base');

module.exports = {
  ...webpackBase,
  mode: 'none',
  plugins: [
    ...webpackBase.plugins,
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
    new CleanWebpackPlugin(),
  ],

  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        // commons: {
        //   test: /(react|react-dom)/,
        //   name: "vendors",
        //   chunks: "all",
        // },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
  // devtool: "inline-source-map",
};
