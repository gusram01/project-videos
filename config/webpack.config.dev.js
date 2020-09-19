const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './apimovies/ts/index.ts',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name]/bundle.[hash].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
  },
  devServer: {
    open: true,
    // publicPath: '/'
  },
  optimization: {
    namedModules: true,
    nodeEnv: 'development',
    noEmitOnErrors: false,
    minimize: false,
    removeAvailableModules: false,
    concatenateModules: true,
    checkWasmTypes: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './apimovies/home/index.html',
      filename: './index.html'
    }),
    new HtmlWebpackPlugin({
      template: './apimovies/search/search.html',
      filename: './search/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          /dist/
        ]
      },

      {
        test: /\.css$/i,
        use: [ 'style-loader', 'css-loader' ],
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/assets/img',
              publicPath: '/assets/img',
              emitFile: true
            }
          }
        ]
      },

      {
        test: /\.(wav|mp3|ogg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/assets/audio',
              publicPath: '/assets/audio',
              emitFile: true
            }
          }
        ]
      },
    ]
  }
};