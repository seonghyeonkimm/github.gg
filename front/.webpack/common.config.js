const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(
            __dirname,
            `../.eslint/.eslintrc${isDev ? '.dev' : ''}.js`
          ),
        },
      },
      { test: /\.tsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      apis: path.resolve(__dirname, '../src/apis'),
      schemas: path.resolve(__dirname, '../src/schemas'),
      styles: path.resolve(__dirname, '../src/styles'),
    },
    extensions: ['.ts', '.tsx', '.json', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../templates/index.ejs'),
      title: 'commit.gg',
      description: 'What is your tier on github?',
      theme: '#c921f3',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isDev ? '[name].css' : '[name].[hash].optimize.css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].optimize.css',
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
