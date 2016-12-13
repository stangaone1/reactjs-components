const path = require('path');

module.exports = {
  context: path.join(__dirname, '../basis'),
  resolve: {
    root: [path.join(__dirname, 'basis')],
    extensions: ['', '.js', '.jsx', '.es6', '.scss'],
    modulesDirectories: [
      'basis',
      'node_modules',
    ],
  },
  module: {
    loaders: [
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[path][name].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      },
      {
        test: /\.js$|.jsx$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-1', 'react'],
          plugins: [
            "transform-runtime",
            "babel-plugin-add-module-exports",
            'babel-plugin-transform-decorators-legacy',
          ]
        },
      },
      {
        test: /\.(scss|css)$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader?outputStyle=expanded&' +
        'includePaths[]=' + path.resolve(__dirname, '/basis/styles') + '&' +
        '&includePaths[]=' + path.resolve(__dirname, 'node_modules', 'basis'),
      }
    ]
  }
};