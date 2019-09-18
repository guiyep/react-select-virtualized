import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';
// this is a workaround for storybook, storybook and addon-info does not work with react.memo. I will create a wrapper to fix this.
// here you will import the component per the documentation `import Select from 'path-to-select'`
import Async from './_AsyncTablePropsStoryFix';
import { optionsDefault, opsGroup20000, buildOptionsSize } from '../../../data';

const ops = buildOptionsSize(2000);

const loadListOptions = (input, callback) =>
  setTimeout(() => {
    const result = ops.filter(({ label }) => label.toLowerCase().includes(input));
    callback(result);
  }, 800);

const loadGroupedOptions = (input, callback) =>
  setTimeout(() => {
    const result = opsGroup20000.reduce((acc, item) => {
      const newItems = item.options.filter(({ label }) => label.toLowerCase().includes(input));
      if (newItems.length > 0) {
        acc.push({
          ...item,
          options: newItems,
        });
      }
      return acc;
    }, []);
    callback(result);
  }, 800);

storiesOf(`React Select Virtualized/Async`, module)
  .addDecorator((story) => <div style={{ width: '30em' }}> {story()} </div>)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      source: true,
      maxPropsIntoLine: 1,
    },
  })
  .add('Async with default options', () => {
    return <Async defaultOptions={optionsDefault} loadOptions={loadListOptions} />;
  })
  .add('Async without default options', () => {
    return <Async loadOptions={loadListOptions} />;
  })
  .add(
    'Async with value controlled',
    withState({ value: ops[0] })(({ store }) => (
      <Async
        value={store.state.value}
        loadOptions={loadListOptions}
        onChange={(val) => {
          store.set({ value: val });
        }}
      />
    )),
  )
  .add('Async with default options grouped', () => {
    return <Async defaultOptions={opsGroup20000} loadOptions={loadGroupedOptions} grouped />;
  })
  .add('Async without default options grouped', () => {
    return <Async loadOptions={loadGroupedOptions} grouped />;
  })
  .add(
    'Async with value controlled grouped',
    withState({ value: opsGroup20000[0].options[0] })(({ store }) => (
      <Async
        value={store.state.value}
        loadOptions={loadGroupedOptions}
        onChange={(val) => {
          store.set({ value: val });
        }}
        grouped
      />
    )),
  );
