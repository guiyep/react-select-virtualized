import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/select/Select.stories');
  require('../src/components/select/SelectBigLoad.stories');
  require('../src/components/async/Async.stories');
  require('../src/components/creatable/CreatableSelect.stories');
  require('../src/components/select/Select.stories.css');
}

configure(loadStories, module);
