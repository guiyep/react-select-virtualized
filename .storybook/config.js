import { configure } from '@storybook/react';

function loadStories() {
  require('../src/select-virtualized/components/select/Select.stories');
  require('../src/select-virtualized/components/select/SelectBigLoad.stories');
  require('../src/select-virtualized/components/async/Async.stories');
  require('../src/select-virtualized/components/select/Select.stories.css');
}

configure(loadStories, module);
