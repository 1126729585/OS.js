'use strict';

const _path = require('path');
const _config = require('./src/build/config.js');
const _build = require('./src/build/core.js');

const getAbsolute = (iter) => _path.join(__dirname, iter);

const debug = false;

function getFiltered(i, debug) {
  if ( i.match(/^dev:/) && !debug ) {
    return false;
  }
  if ( i.match(/^prod:/) && debug ) {
    return false;
  }
  return true;
}

module.exports = new Promise((resolve) => {
  _config.getConfiguration().then((cfg) => {
    const bf = _build.getBuildFiles(cfg.build);

    resolve({
      //devtool: 'source-map',
      devtool: debug ? 'eval-source-map' : 'source-map',

      resolve: {
        modules: [
          _path.resolve(getAbsolute('src/client/javascript'))
        ]
      },

      entry: {
        locales: bf.locales.filter(getFiltered).map(getAbsolute),
        osjs: getAbsolute(bf.javascript)
          //bf.javascript.filter(getFiltered).map(getAbsolute),
      },

      output: {
        path: getAbsolute('dist'),
        sourceMapFilename: '[name].min.js.map',
        filename: '[name].min.js'
      },

      module: {

        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader'
          }
        ]

      },

      plugins: [
        /*
        new _webpack.optimize.UglifyJsPlugin({
          minimize: debug,
          level: 2, // FIXME
          rebase: false,
          sourceMap: true
        })
        */
      ]
    });
  });
});
