/*eslint-disable */
const babel = require('babel-core');
const fs = require('fs');
const _ = require('lodash');

require('babel-register')({
  presets: ['es2015', 'stage-1', 'react'],
  plugins: [
    "transform-runtime",
    "babel-plugin-transform-decorators-legacy",
    "babel-plugin-add-module-exports"
  ]
});
global.PLUGINS = [];
global.CONFIG = {};

require.extensions['.scss'] = function scssLoader() {
  return null;
};

require.extensions['.css'] = function cssLoader() {
  return null;
};

require.extensions['.png'] = function fileLoader() {
  return null;
};
/*eslint-enable */
