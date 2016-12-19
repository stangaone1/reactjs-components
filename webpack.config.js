var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var packageJSON = require('./package.json');
var appVersion = packageJSON.version;
var appName = packageJSON.name;
var _ = require('lodash');

const PORT = 3003;

var envConfig = {
  development: {
    js: '[name].js',
    css: '[name].css',
    img: '[path][name].[ext]',
  },

  production: {
    js: '[name].js',
    css: '[name].css',
    img: '[path][name].[ext]',
  },
};

var env = process.env.NODE_ENV || 'development';

var config = envConfig[env];

//
// DEFAULT PLUGINS
//
config.plugins = [
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development' || true),
    __PROD__: JSON.stringify(process.env.NODE_ENV === 'production' || false),
  }),
  new ExtractTextPlugin(config.css),
];

// DEVELOPMENT PLUGINS
if (env === 'development') {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}

// PRODUCTION PLUGINS
if (env === 'production') {
  config.plugins.push(
    new webpack.BannerPlugin('App ' + appName + ' version: ' + appVersion, {entryOnly: true}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        drop_console: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  );
}

//
// DEFAULT LOADERS
//
config.loaders = [
  // IMAGES
  {
    test: /.*\.(gif|png|jpe?g|svg)$/i,
    loaders: [
      'file?hash=sha512&digest=hex&name=' + config.img,
      'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
    ],
  },
];

//DEVELOPMENT LOADERS
if (env === 'development') {
  config.loaders.push(
    {
      test: require.resolve("react"),
      loader: "expose?React",
    },
    {
      test: require.resolve("lodash"),
      loader: "expose?_!expose?lodash",
    },
    // ES6 trough Babel
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
          ["react-transform", {
            "transforms": [
              {
                "transform": "react-transform-hmr",
                "imports": ["react"],
                "locals": ["module"]
              },
              {
                "transform": "react-transform-catch-errors",
                "imports": ["react", "redbox-react"]
              }
            ].concat(process.env.VISUAL ? [{
              "transform": "react-transform-render-visualizer",
            }] : [])
          }]
        ]
      },
    },
    {
      test: /\.(scss|css)$/,
      loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader?outputStyle=expanded&' +
      'includePaths[]=' + path.join(__dirname, '/basis/styles') + '&' +
      '&includePaths[]=' + path.resolve(__dirname, 'node_modules', 'basis'),
    })
}

//PRODUCTION LOADERS
if (env === 'production') {
  config.loaders.push(
    {
      test: /\.js$|.jsx$/,
      loader: 'babel',
      exclude: /(node_modules)/,
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'stage-1', 'react'],
        plugins: [
          'transform-runtime',
          'babel-plugin-transform-decorators-legacy',
          'babel-plugin-add-module-exports',
        ],
      },
    },
    {
      test: /\.(scss|css)$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader?outputStyle=expanded&' +
        'includePaths[]=' + path.join(__dirname, '/basis/styles') + '&' +
        '&includePaths[]=' + path.resolve(__dirname, 'node_modules', 'basis'))
    })
}

module.exports = {
  context: path.join(__dirname, 'basis'),
  entry: {
    'components': 'components.js',
  },
  output: {
    path: 'dist',
    libraryTarget: "commonjs",
    filename: config.js,
  },
  cache: env === 'development',
  debug: env === 'development',
  devtool: env === 'development' ? 'eval-source-map' : '',
  module: {
    preLoaders: [],
    loaders: config.loaders,
  },

  resolve: {
    root: [path.join(__dirname, 'basis')],
    extensions: ['', '.js', '.jsx', '.es6', '.scss'],
    modulesDirectories: [
      'basis',
      'node_modules',
    ],
  },

  plugins: config.plugins,

  externals: {
    "react": "react",
    "react-addons-shallow-compare": "react-addons-shallow-compare",
    "moment": "moment",
    "react-dnd": "react-dnd",
    "react-quill": "react-quill",
    "react-modal": "react-modal",
    "react-dom": "react-dom",
    "lodash": "lodash",
    "react-dnd-html5-backend": "react-dnd-html5-backend",
    "classnames": "classnames",
  },

  devServer: {
    contentBase: 'public',
    noInfo: false, //  --no-info option
    stats: {
      assets: true,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: true,
    },
    hot: true,
    inline: true,
    port: PORT,
  },
};
