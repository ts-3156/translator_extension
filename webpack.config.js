const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const devtool = mode === 'production' ? false : 'inline-source-map'

module.exports = {
  devtool: devtool,
  mode: mode,
  entry: {
    background: './src/background.js',
    contentscript: './src/contentscript.js',
    options_script: './src/options_script.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-classes']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        'assets/manifest.json',
        'assets/icon128.png',
        'assets/options.html',
        'assets/popup.html',
        'assets/button.html',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
      ],
    }),
  ]
}
