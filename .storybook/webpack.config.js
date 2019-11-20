const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.alias['@rsv-lib'] = path.resolve(__dirname, '../src/lib');
  config.resolve.alias['@rsv-hooks'] = path.resolve(__dirname, '../src/hooks');
  return config;
};
