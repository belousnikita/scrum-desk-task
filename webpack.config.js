var webpack = require("webpack");
var path = require('path');
var config = require('./src/etc/config.json');
module.exports = {
  mode: "development",
  entry: "./src/client/main.js",
  output: {
    path: __dirname + "/src/public/build/",
    publicPath: "build/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, 'src/public/'),
    compress: true,
    port: config.pagePort,
  },
  watch: true,
  module: {
    rules: [
      {
        test: [/\.js$/,/\.jsx$/],
        exclude: [/node_modules/, /public/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.css$/,
        use: [
            "css-loader", // translates CSS into CommonJS
          ]
      }
    ]
  }
};
