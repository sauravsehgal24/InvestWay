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
                test: /\.tsx?$/,
                exclude: /node_modules/,
                include: [
                    `${path.resolve(__dirname, "../utils")}`,
                    `${path.resolve(__dirname)}`,
                ],
                use: "ts-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                include: [`${path.resolve(__dirname, "./assets/images")}`],
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: ["url-loader"],
            },
            {
                include: [`${path.resolve(__dirname, "./assets/audio")}`],
                test: /\.(mp3|wav)$/,
                use: ["file-loader"],
            },
        ],
    },
    devServer: {
        watchOptions: {
            ignored: /node_modules/,
        },
        historyApiFallback: true,
        inline: true,
        compress: true,
        watchContentBase: true,
        liveReload: true,
        port: 3001,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development"),
            "process.env.REACT_APP_API": JSON.stringify(
                "http://localhost:3000/api"
            ),
            "process.env.REACT_APP_SERVER": JSON.stringify(
                "http://localhost:3000"
            ),
            "process.env.REACT_APP_LOOPBACK": JSON.stringify(
                "http://localhost:3001"
            ),
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx", ".tsx", ".ts"],
    },
};
