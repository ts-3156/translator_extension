const path = require('path')
const DotenvPlugin = require('dotenv-webpack')
const CopyPlugin = require('copy-webpack-plugin')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const devtool = mode === 'production' ? false : 'inline-source-map'
const dotenv_path = mode === 'production' ? '.env.production' : '.env'

const dotenv = require('dotenv')
const env = dotenv.config({path: dotenv_path}).parsed

const genVersion = function () {
  const padZero = function (n) {
    return ('0' + n).slice(-2)
  }
  const d = new Date()
  return d.getFullYear() + '.' + padZero(d.getMonth() + 1) + padZero(d.getDate()) + '.' + padZero(d.getHours()) + padZero(d.getMinutes())

}

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
    new DotenvPlugin({path: dotenv_path}),
    new CopyPlugin({
      patterns: [
        {
          from: 'assets/manifest.json',
          to: 'manifest.json',
          transform: function (content) {
            const manifest = JSON.parse(content.toString())
            manifest.key = env.MANIFEST_KEY
            manifest.oauth2.client_id = env.MANIFEST_OAUTH2_CLIENT_ID
            // delete manifest.key
            // delete manifest.oauth2

            if (mode === 'development') {
              manifest.name += ' (dev)'
            }

            manifest.version = genVersion()

            return JSON.stringify(manifest)
          }
        },
        'assets/icon128.png',
        'assets/how_to_use_01.png',
        'assets/how_to_use_02.png',
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
