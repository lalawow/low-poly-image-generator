const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const os = require("os");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const getClientEnvironment = require('./env');

const isEnvProduction = false
const isEnvDevelopment = true
const publicPath = "/"
const publicUrl = isEnvProduction
  ? publicPath.slice(0, -1)
  : isEnvDevelopment && '';
const env = getClientEnvironment(publicUrl);
console.log("ENV show", env)

const smp = new SpeedMeasurePlugin();
module.exports = {
  entry: {
    app: [
      "babel-polyfill",
      "./src/index.js",
      "./src/containers/home/index.js",
    ],
    vendor: ["react", "better-scroll", "react-redux", "react-lazyload"]
  },
  output: {
    filename: "[name].[hash:8].js",
    path: resolve(__dirname, "../build")
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        include: resolve(__dirname, "/src/js"),
        loader: "eslint-loader"
      },
      {
        oneOf: [
          {
            test: /\.(html)$/,
            loader: "html-loader"
          },
          {
            test: /\.(js|jsx)$/,
            use: [
              {
                loader: "thread-loader",
                options: {
                  workers: os.cpus().length
                }
              },
              {
                loader: "babel-loader",
                options: {
                  //jsx语法
                  presets: [
                    "@babel/preset-react",
                    //tree shaking 按需加载babel-polifill
                    [
                      "@babel/preset-env",
                      { modules: false, useBuiltIns: "false", corejs: 2 }
                    ]
                  ],
                  plugins: [
                    //支持import 懒加载
                    "@babel/plugin-syntax-dynamic-import",
                    //andt-mobile按需加载  true是less，如果不用less style的值可以写'css'
                    // ["import", { libraryName: "antd-mobile", style: true }],
                    ['import', { libraryName: 'antd', style: 'css', libraryDirectory: 'es', }],
                    //识别class组件
                    ["@babel/plugin-proposal-class-properties", { loose: true }]
                  ],
                  cacheDirectory: true
                }
              }
            ]
          },
          {
            test: /\.(less|css)$/,
            use: [
              { loader: "style-loader" },
              {
                loader: "css-loader",
                options: {
                  modules: false,
                  localIdentName: "[local]--[hash:base64:5]"
                }
              },
              // {
              //   loader: "less-loader",
              //   options: { javascriptEnabled: true }
              // }
            ]
          },
          {
            test: /\.(jpg|jpeg|bmp|svg|png|webp|gif)$/,
            loader: "url-loader",
            options: {
              limit: 8 * 1024,
              name: "[name].[hash:8].[ext]"
            }
          },
          {
            exclude: /\.(js|json|less|css|jsx)$/,
            loader: "file-loader",
            options: {
              outputPath: "media/",
              name: "[name].[hash].[ext]"
            }
          },
          {
            test: /\.ico$/,
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HardSourceWebpackPlugin(),
    new webpack.DefinePlugin(env.stringified),
  ],
  mode: "development",
  devServer: {
    contentBase: "../build",
    open: true,
    port: 5000,
    hot: true,
    host: "0.0.0.0"
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"]
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: "all"
    }
  }
};
