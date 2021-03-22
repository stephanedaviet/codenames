const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    main: "./src/index.js",
    vendors: ["react", "react-dom", "react-refresh/runtime"],
  },
  optimization: {
    runtimeChunk: "single",
  },
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".scss"],
    fallback: {
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"),
    },
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ].filter(Boolean),
  devServer: {
    compress: true,
    clientLogLevel: "info",
    overlay: true,
    hot: true,
    host: "0.0.0.0",
    disableHostCheck: true,
    progress: true,
  },
  devtool: "eval-source-map",
};
