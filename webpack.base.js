const autoprefixer = require("autoprefixer");
const glob = require("glob");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, "./src/*/index.js"));

  Object.keys(entryFiles).forEach((index) => {
    const entryFile = entryFiles[index];

    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    const obj = new HtmlWebpackPlugin({
      inlineSource: ".css$", // todo
      template: path.join(projectRoot, `./src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: ["vendors", pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    });
    return htmlWebpackPlugins.push(obj);
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },
  module: {
    rules: [
      {
        test: /.js$/,
        // include: path.resolve('src'), // 优化速度
        // exclude: /node_modules/,
        // use: ['babel-loader', 'eslint-loader'],
        use: [
          // {
          //   loader: "thread-loader",
          //   options: {
          //     workers: 10,
          //   },
          // },
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     plugins: () => [
          //       autoprefixer({
          //         overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
          //       }),
          //     ],
          //   },
          // },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    overrideBrowserslist: ["last 2 version", ">1%", "ios 7"],
                  }),
                ],
              },
            },
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
          "less-loader",
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8][ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function errorPlugin() {
      this.hooks.done.tap("done", (stats) => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf("--watch") === -1
        ) {
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),
  // stats: 'errors-only',
};
