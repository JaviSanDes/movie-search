const path= require('path');
const autoprefixer = require('autoprefixer');
const htmlWebpackPlugin= require('html-webpack-plugin');
const webpack = require("webpack")


module.exports= {
    entry: {
      main: [
        "babel-runtime/regenerator",
        "webpack-hot-middleware/client?reload=true",
        "./src/main.js"
      ]
    },
    mode: "development",
    output: {
      filename: "[name]-bundle.js",
      path: path.resolve(__dirname, "../dist"),
      publicPath: "/"
    },
    devServer: {
      historyApiFallback: true,
      inline: true,
      hot: true,
      port: 8080,
      contentBase: "dist",
      overlay: true,
      stats: {
        colors: true
      }
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
                      { loader: 'style-loader' },
                      { 
                       loader: 'css-loader',
                       options: {
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
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}