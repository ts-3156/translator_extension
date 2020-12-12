const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const devtool = mode === 'production' ? false : 'inline-source-map'

module.exports = {
  devtool: devtool,
  mode: mode,
  entry: {
    background: './background.js',
    contentscript: './contentscript.js',
    i18n: './lib/i18n.js',
    options_script: './lib/options_script.js'
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
        'manifest.json',
        '*.png',
        'options.html',
        'lib/popup.html',
        'lib/button.html',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
      ],
    }),
  ]
}
