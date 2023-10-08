const { resolve, join } = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (_, argv) => {
  const MODE = argv.mode;
  const isDev = MODE === "development";
  const isDevAsProd = true;
  const PATH_TO_ENV_FILE = isDev || isDevAsProd ? ".env.dev" : ".env";

  const env = dotenv.config({ path: PATH_TO_ENV_FILE }).parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  console.log({ MODE, env, envKeys });

  const fileName = (ext) =>
    isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`;

  return {
    mode: "development",
    devtool: isDev ? "source-map" : false,
    entry: "./src/index.js",
    output: {
      publicPath: "/",
      path: resolve(__dirname, "dist/build"),
      filename: fileName(".js"),
      clean: true,
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      alias: {
        "@": resolve(__dirname, "src/"),
      },
    },
    devServer: {
      static: [{ directory: join(__dirname, "src") }],
      historyApiFallback: true,
      compress: true,
      port: 3001,
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new HTMLWebpackPlugin({
        template: "./public/index.html",
        minify: { collapseWhitespace: !isDev },
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.(jpe?g|png|gif|webp|ico)?$/,
          exclude: /fonts/,
          type: "asset/resource",
          generator: {
            filename: `assets/img/${fileName("[ext]")}`,
          },
        },
        {
          test: /\.(svg)?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
            {
              loader: "react-svg-loader",
              options: {
                jsx: true,
              },
            },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot)?$/,
          exclude: /img/,
          type: "asset/resource",
          generator: {
            filename: `assets/fonts/${fileName("[ext]")}`,
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            "css-loader",
            "resolve-url-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
  };
};
