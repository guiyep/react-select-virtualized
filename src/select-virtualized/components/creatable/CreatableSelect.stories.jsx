import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import CreatableSelect from './CreatableSelect.container';
import { optionsDefault, opsGroup20000, ops2500 } from '../../../data';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';

storiesOf(`React Select Virtualized/Creatable`, module)
  .addDecorator((story) => <div style={{ width: '30em' }}> {story()} </div>)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      source: true,
      maxPropsIntoLine: 1,
    },
  })
  .add('Basic', () => <CreatableSelect options={optionsDefault} />)
  .add('Basic 2500 elements ', () => <CreatableSelect options={ops2500} />)
  .add(
    'Basic with onCreateOption callback (only with controlled)',
    withState({ options: optionsDefault, selected: null })(({ store }) => {
      const onCreateOption = (newItem) => {
        store.set({ options: store.state.options.concat([newItem]) });
        store.set({ selected: newItem });
        action(`onCreateOption`)(newItem);
      };
      const onChange = (item) => {
        store.set({ selected: item });
        action(`onChange`)(item);
      };
      return (
        <CreatableSelect
          options={store.state.options}
          value={store.state.selected}
          onCreateOption={onCreateOption}
          onChange={onChange}
        />
      );
    }),
  )
  .add(
    'Basic 2500 elements with onCreateOption callback (only with controlled)',
    withState({ options: ops2500, selected: null })(({ store }) => {
      const onCreateOption = (newItem) => {
        store.set({ options: store.state.options.concat([newItem]) });
        store.set({ selected: newItem });
        action(`onCreateOption`)(newItem);
      };
      const onChange = (item) => {
        store.set({ selected: item });
        action(`onChange`)(item);
      };
      return (
        <CreatableSelect
          options={store.state.options}
          value={store.state.selected}
          onCreateOption={onCreateOption}
          onChange={onChange}
        />
      );
    }),
  )
  .add(
    'Basic grouped to the first group',
    withState({ options: opsGroup20000, selected: null })(({ store }) => {
      const onCreateOption = (newItem) => {
        store.set({ options: store.state.options[0].options.concat([newItem]) });
        store.set({ selected: newItem });
        action(`onCreateOption`)(newItem);
      };
      const onChange = (item) => {
        store.set({ selected: item });
        action(`onChange`)(item);
      };
      return (
        <CreatableSelect
          options={store.state.options}
          value={store.state.selected}
          onCreateOption={onCreateOption}
          onChange={onChange}
          grouped
        />
      );
    }),
  );
