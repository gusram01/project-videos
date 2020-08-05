const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  mode: 'development',
  entry: { home: './src/index.ts' },
  devServer: {
    contentBase: './public',
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },

  output: {
    filename: '[name]/[name].js',
    path: path.resolve(__dirname, 'public', 'apimovies'),
    publicPath: '/',
  },

  optimization: {
    namedModules: true,
    nodeEnv: 'development',
    noEmitOnErrors: false,
    minimize: false,
    removeAvailableModules: false
  },

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: '/index.html'
    }),

    new HtmlWebpackPlugin({
      template: './src/search.html',
      filename: './search/index.html'
    }),

    new MiniCssExtractPlugin({ filename: '[name]/[name].css' }),
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
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]

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