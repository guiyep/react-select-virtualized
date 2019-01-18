import { configure } from '@storybook/react';

function loadStories() {
  // require('../src/select/_select.css'),
  require('../src/select/Select.stories'), require('../src/select-v2/Select.stories');
}

configure(loadStories, module);
