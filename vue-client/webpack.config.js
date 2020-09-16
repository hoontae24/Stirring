const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// Load environment variables
const dotenv = require('dotenv');
const fs = require('fs')
const envPath = path.resolve(process.cwd(), '.env');
const envDefaultPath = path.resolve(process.cwd(), '.env.defaults');
dotenv.config({ path: fs.existsSync(envPath) ? envPath : envDefaultPath });

const config = {
  mode: process.env.NODE_ENV,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.vue', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.m?(js|ts)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: `@import "@/scss";`,
            },
          },
        ],
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 1024 * 10,
          name: '[name].[hash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/assets/favicon.ico',
      title: 'Stirring',
      hash: true,
      inject: true,
    }),
    new Dotenv({
      defaults: true,
    }),
  ],
  entry: {
    app: path.resolve(__dirname, 'src/main.ts'),
  },
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist', 'public'),
    publicPath: '/',
  },
  devServer: {
    stats: 'errors-only',
    historyApiFallback: true,
    port: process.env.SERVER_PORT,
  },
};

module.exports = config;
