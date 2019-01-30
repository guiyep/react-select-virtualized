import { configure } from '@storybook/react';

function loadStories() {
  require('../src/select-virtualized/Select.stories');
  require('../src/select-virtualized/Select.stories.css')
}

configure(loadStories, module);
