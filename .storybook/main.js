const path = require('path');

module.exports = {
  stories: ['../src/components/**/*.stories.jsx', '../src/components/select/Select.stories.css'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@dump247/storybook-state',
    '@storybook/addon-essentials',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias['@rsv-lib'] = path.resolve(__dirname, '../src/lib');
    config.resolve.alias['@rsv-hooks'] = path.resolve(__dirname, '../src/hooks');
    config.resolve.alias['@rsv-components'] = path.resolve(__dirname, '../src/components');
    // Return the altered config
    return config;
  },
};
