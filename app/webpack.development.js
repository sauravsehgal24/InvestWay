var webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.tsx",
  mode: "development",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundelLocal.[hash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: ["url-loader"],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    watchContentBase: true,
    liveReload: true,
    port: 3001,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"development"',
      "process.env.REACT_APP_API": '"http://localhost:3000/api"',
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },
};
