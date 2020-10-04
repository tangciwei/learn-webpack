const cssnano = require("cssnano");
const path = require('path')
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require("./webpack.base");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasureWebpackPlugin();
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const prodConfig = {
  mode: "production",
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: "react",
    //       entry: "https://11.url.cn/now/lib/16.2.0/react.min.js",
    //       global: "React",
    //     },
    //     {
    //       module: "react-dom",
    //       entry: "https://11.url.cn/now/lib/16.2.0/react-dom.min.js",
    //       global: "ReactDOM",
    //     },
    //   ],
    // }),
    new webpack.DllReferencePlugin({
      manifest: require("./build/library/library.json"),
    }),
    new HardSourceWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
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
          name: "vendors",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true, // 压缩缓存
      }),
    ],
  },
  resolve: {
    alias: {
      react: path.resolve(
        __dirname,
        "./node_modules/react/umd/react.production.min.js"
      ),
      "react-dom": path.resolve(
        __dirname,
        "./node_modules/react-dom/umd/react-dom.production.min.js"
      ),
    },
    // extensions: ['.js'],
    // mainFields: ['main']
  },
};

module.exports = smp.wrap(merge(baseConfig, prodConfig));
// module.exports = merge(baseConfig, prodConfig);
