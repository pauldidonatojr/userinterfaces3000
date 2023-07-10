const port = process.env.PORT || 3001;
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app.js",

  output: {
    path: path.join(__dirname, "/build"),
    filename: "main.[fullhash].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif|mpc|mps|mpb|cxc|cxs|cxb|tga|mtl|fbx|ico|jpg|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets",
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "esbuild-loader",
            options: {
              loader: "css",
              minify: true,
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: ["json-loader"],
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
  devServer: {
    host: "localhost",
    port: port,
    historyApiFallback: true,
    open: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
