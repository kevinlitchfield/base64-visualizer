module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
}
