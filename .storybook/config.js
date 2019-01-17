import { configure } from '@storybook/react';

function loadStories() {
  require('../src/select/Select.stories');
}

configure(loadStories, module);
