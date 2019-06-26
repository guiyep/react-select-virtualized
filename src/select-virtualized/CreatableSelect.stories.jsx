import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import CreatableSelect from './CreatableSelect';
import { optionsDefault } from '../data';
import { withState } from '@dump247/storybook-state';

storiesOf(`React Select Virtualized/Creatable`, module)
  .addDecorator((story) => <div style={{ width: '30em' }}> {story()} </div>)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      source: true,
      maxPropsIntoLine: 1,
    },
  })
  .add(
    'Basic',
    withState({ options: optionsDefault, selected: undefined })(({ store }) => {
      const onCreateOption = (input) => {
        const newItem = { label: input, value: input };
        store.set({ options: store.state.options.concat([newItem]) });
        store.set({ selected: newItem });
      };
      return (
        <CreatableSelect options={store.state.options} value={store.state.selected} onCreateOption={onCreateOption} />
      );
    }),
  );
