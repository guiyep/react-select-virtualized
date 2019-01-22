import { configure } from '@storybook/react';

function loadStories() {
  require('../src/select-v2/Select.stories');
}

configure(loadStories, module);
