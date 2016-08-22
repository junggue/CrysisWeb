module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: './compiled'
  },
  "scripts": {
  "postinstall": "webpack --config ./webpack-prod.config.js --progress --colors",
  "start": "node server.js"
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extentions: ['', '.js', '.jsx']
  }
}