
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpack = require('webpack')
const path = require('path');

// Constant with our paths
const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src/scripts'),
    SRC_HTML: path.resolve(__dirname, 'src')
};


module.exports = {
    mode: 'development',
    entry: {
        index: ['babel-polyfill', path.join(paths.SRC, 'index.js')],
        bootstrap: path.join(paths.SRC, 'bootstrap.js'),
        store: path.join(paths.SRC, 'store.js'),
    },
    output: {
        path: paths.DIST,
        filename: '[name].app.bundle.js'
    },
    devServer: {
      https: true,
      hot: true,
      inline: true,
      contentBase: path.join(__dirname, 'src'),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    devtool: 'inline-source-map',
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    module: {
      rules: [
        {
         test: /\.yaml$/,
         use: 'js-yaml-loader',
        },
        {
          test: /.js$/,
          loader: "babel-loader",
          // addresses issue of typeof not found https://github.com/mapbox/mapbox-gl-js/issues/3422
          exclude: /(mapbox-gl|node_modules)/,
          options: {
            presets: ["es2015",'stage-2']
          }
        },
        htmlLoader = {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.css$/,
          use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader']
        },
        // urlLoader = {
        //     test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        //     use: [{
        //         loader: 'url-loader',
        //         options: {
        //             limit: 100000, // Convert images < 8kb to base64 strings
        //             name: 'images/[hash]-[name].[ext]'
        //         }
        //     }]
        // },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/i,
          use: [
           {
             loader: 'file-loader',
             options: {
               esModule: false,
             },
           },
          ],
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'node_modules/webworkify/index.js'),
          loader: 'worker'
        },
        {
          test: /\.scss$/,
          use:  [  'style-loader',
          {
            loader:  MiniCssExtractPlugin.loader,
            options: { esModule: false}
          },
          'css-loader', 'postcss-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css',
      }),
        //index - map
      new HtmlWebpackPlugin({
          hash: true,
          template: path.join(paths.SRC_HTML, 'index.html'),
          filename: path.join(paths.DIST, 'index.html'),
      }),
      new webpack.HotModuleReplacementPlugin(),
   ]

}
