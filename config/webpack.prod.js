const path= require('path');
//const autoprefixer = require('autoprefixer');
const htmlWebpackPlugin= require('html-webpack-plugin');
const webpack = require("webpack")

const OptimizeCssAssetsPlugin= require("optimize-css-assets-webpack-plugin")
const MiniCSSExtractPlugin= require("mini-css-extract-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports= {
    entry: "./src/main.js",
    mode: "production",
    output: {
      filename: "[name]-bundle.js",
      path: path.resolve(__dirname, "../dist"),
      publicPath: "/"
    },
    devtool: "source-map",
    module: {
        rules: [
                {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                     loader: 'babel-loader'
                     }
                },
                {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                      { loader: MiniCSSExtractPlugin.loader },
                      { 
                       loader: 'css-loader',
                       options: {
                                 minimize: true,
                                 importLoaders: 1,
                                 modules: true,
                                 localIdentName: '[name]__[local]__[hash:base64:5]'
                                }
                      },
                      { 
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require("autoprefixer")()
                            ]
                        }
                     }
                    ]
                },
                {
                  test: /\.jpg$/,
                  use: [
                    {
                      loader: "file-loader",
                      options: {
                        name: "images/[name].[ext]"
                      }
                    }
                  ]
                },
                {
                    test: /\.html$/,
                    use: [
                      {
                        loader: "html-loader"
                      }
                    ]
            }
               ]
    },
    plugins: [
      new UglifyJsPlugin(),
      new OptimizeCssAssetsPlugin(),
      new MiniCSSExtractPlugin({
        filename: "[name]-[contenthash].css"
      }),
        new htmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}