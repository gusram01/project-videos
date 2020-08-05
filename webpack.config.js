const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: { home: './src/index.ts' },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name]/[name].[contentHash].js',
    path: path.resolve(__dirname, 'public', 'apimovies'),
    publicPath: '/',

  },
  optimization: {
    namedModules: false,
    nodeEnv: 'production',
    concatenateModules: true,
    noEmitOnErrors: true,
    checkWasmTypes: true,
    minimize: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/search.html',
      filename: './search/index.html'
    }),
    new MiniCssExtractPlugin({ filename: '[name]/[name].[contentHash].css' }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          / backend /,
          /public/
        ]
      },

      {
        test: /\.css$/i,
        exclude: /styles\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },

      {
        test: /styles\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]

      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../assets/',
              publicPath: '../assets/',
              emitFile: true,
              esModule: false
            }
          }
        ]
      },
    ]
  }
};