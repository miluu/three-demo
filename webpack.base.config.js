module.exports = {
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts'
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  externals: {
    three: 'Three',
    lodash: '_'
  },
}
