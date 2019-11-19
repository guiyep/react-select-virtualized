const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.alias['@rsv-lib'] = path.resolve(__dirname, '../src/select-virtualized/lib');
  return config;
};
