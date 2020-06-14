const path = require("path");
module.exports = {
  mode: 'development',
  entry: ["@babel/polyfill", "./src/gituser.js"],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    publicPath: '/assets/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  }
  // Loaders
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
}