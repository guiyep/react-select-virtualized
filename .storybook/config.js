import { configure } from '@storybook/react';

function loadStories() {
  require('../src/select-virtualized/Select.stories');
  require('../src/select-virtualized/SelectBigLoad.stories');
  require('../src/select-virtualized/Async.stories');
  require('../src/select-virtualized/CreatableSelect.stories');
  require('../src/select-virtualized/Select.stories.css');
}

configure(loadStories, module);
