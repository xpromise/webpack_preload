const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

function getStyleLoader(pre) {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    pre,
  ].filter(Boolean);
}

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[hash:10][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: getStyleLoader(),
          },
          {
            test: /\.less$/,
            use: getStyleLoader("less-loader"),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoader("sass-loader"),
          },
          {
            test: /\.styl$/,
            use: getStyleLoader("stylus-loader"),
          },
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 10kb
              },
            },
          },
          {
            test: /\.(ttf|woff2?|map3|map4|avi)$/,
            type: "asset/resource",
          },
          {
            test: /\.js$/,
            include: path.resolve(__dirname, "src"),
            use: [
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true,
                  cacheCompression: false,
                  plugins: ["@babel/plugin-transform-runtime"],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, "src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.css",
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  mode: "production",
  devtool: "source-map",
};
