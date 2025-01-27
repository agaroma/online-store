const path = require('path'); // Визначення змінної path

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      reload: true, 
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    open: true,
    hot: true,
    client: {
        overlay: true, // Показувати помилки поверх веб-сторінки
      },
      watchFiles: {
        paths: ['src/**/*', 'src/**/*.html'], // Відслідковує зміни у всіх файлах, включаючи HTML
        options: {
          usePolling: true, // Використовувати polling для файлів
        },
      },
  },
  mode: 'development',
};
