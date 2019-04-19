var webpack = require("webpack");

// module.exports = {
//   entry: "./src/client/main.js",
//   output: {
//     path: __dirname + "/public/build/",
//     publicPath: "build/",
//     filename: "bundle.js"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loader: "babel-loader",
//         exclude: [/node_modules/, /public/],
//         options: {
//           presets: ['@babel/preset-react']
//         }
//       },
//       {
//         test: /\.css$/,
//         loader: "sass-loader!css-loader!autoprefixer-loader",
//         exclude: [/node_modules/, /public/]
//       },
//       {
//         test: /\.less$/,
//         loader: "style-loader!css-loader!autoprefixer-loader!sass",
//         exclude: [/node_modules/, /public/]
//       },
//       {
//         test: /\.gif$/,
//         loader: "url-loader?limit=10000&mimetype=image/gif"
//       },
//       {
//         test: /\.jpg$/,
//         loader: "url-loader?limit=10000&mimetype=image/jpg"
//       },
//       {
//         test: /\.png$/,
//         loader: "url-loader?limit=10000&mimetype=image/png"
//       },
//       {
//         test: /\.svg/,
//         loader: "url-loader?limit=26000&mimetype=image/svg+xml"
//       },
//       {
//         test: /\.jsx$/,
//         loader: "react-hot!babel",
//         exclude: [/node_modules/, /public/]
//       },
//       {
//         test: /\.json$/,
//         loader: "json-loader"
//       }
//     ]
//   }
// };
module.exports = {
  mode: "development",
  entry: "./src/client/main.js",
  output: {
    path: __dirname + "/src/public/build/",
    publicPath: "build/",
    filename: "bundle.js"
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
