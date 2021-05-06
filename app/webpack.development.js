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
        test: /\.tsx$|\.ts$/,
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
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.REACT_APP_API": JSON.stringify("http://localhost:3000/api"),
      "process.env.REACT_APP_LOOPBACK": JSON.stringify("http://localhost:3000"),
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },
};
