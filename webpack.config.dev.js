const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
  mode: 'development',
  entry: { bundle: './apimovies/ts/index.ts' },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name]/bundle.[hash].js',
    path: path.resolve(__dirname, 'public', 'apimovies'),
    publicPath: '/apimovies',

  },
  devServer: {
    open: true,
    openPage: 'apimovies',
    publicPath: '/apimovies'
  },
  optimization: {
    namedModules: true,
    nodeEnv: 'development',
    noEmitOnErrors: false,
    minimize: false,
    removeAvailableModules: false,
    concatenateModules: true,
    checkWasmTypes: true,
    splitChunks: {
      cacheGroups: {
        bundleStyles: {
          name: 'bundle',
          test: (m, c, entry = 'bundle') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        }

      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: './apimovies/home/index.html',
      filename: './index.html'
    }),
    new HtmlWebpackPlugin({
      template: './apimovies/search/search.html',
      filename: './search/index.html'
    }),
    new MiniCssExtractPlugin({ filename: '[name]/bundle.[hash].css' }),
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]

      },

      {
        test: /\.html$/i,
        loader: 'html-loader',
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/assets/img',
              publicPath: '../../assets/img',
              emitFile: true,
              esModule: false
            }
          }
        ]
      },
    ]
  }
};