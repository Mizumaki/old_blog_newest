const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDev ? "development" : "production",
  entry: [__dirname + "/src/index.tsx"],
  output: {
    publicPath: isDev ? "/" : __dirname + "/build",
    filename: "[name].[hash].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  devtool: isDev ? "inline-source-map" : false,
  devServer: {
    port: 3000,
    contentBase: __dirname + "/public",
    inline: true,
    hot: true,
    open: false, // ブラウザを自動で開く
    watchContentBase: true // contentBase配下のindex.htmlの変更もキャッチ
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: ["source-map-loader"]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              hmr: isDev,
              sourceMap: isDev,
              convertToAbsoluteUrls: isDev
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: isDev
                ? "[name]__[local]--[hash:base64:5]"
                : "[hash]",
              sourceMap: isDev
            }
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: __dirname + "/"
              },
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: false, removeComments: false }
          }
        ]
      }
    ]
  },
  plugins: [
    isDev ? new webpack.HotModuleReplacementPlugin() : null,
    new HtmlWebPackPlugin({
      template: __dirname + "/public/index.dev.html",
      filename: "index.dev.html",
      minify: !isDev,
      cache: isDev,
      showErrors: isDev
    })
  ]
};
