const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    stream: require.resolve('stream-browserify'),
    path: require.resolve('path-browserify'),
    https: require.resolve('https-browserify'),
    http: require.resolve('stream-http'),
    buffer: require.resolve('buffer/'),
    util: require.resolve('util/'),
    domain: require.resolve('domain-browser')
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    })
  );
  return config;
};
