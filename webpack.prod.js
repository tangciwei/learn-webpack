const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 无法和style-loader共存
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const cssnano = require("cssnano");
const webpackBase = require("./webpack.base");

module.exports = {
  ...webpackBase,
  mode: "none",
  plugins: [
    ...webpackBase.plugins,
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new CleanWebpackPlugin(),
    function () {
      this.hooks.done.tap("done", (stats) => {
        // console.log(stats)
        // if (
        //   stats.compilation.errors &&
        //   stats.compilation.errors.length &&
        //   process.argv.indexOf("--watch") == -1
        // ) {
        //   console.log("build error");
        //   process.exit(1);
        // }
      });
    },
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
          name: "commons",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
  stats: "errors-only",
  // devtool: "inline-source-map",
};
