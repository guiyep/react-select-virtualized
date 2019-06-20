import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import CreatableSelect from './CreatableSelect';
import { optionsDefault } from '../data';

storiesOf(`React Creatable Select Virtualized/props`, module)
  .addDecorator((story) => <div style={{ width: '30em' }}> {story()} </div>)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      source: true,
      maxPropsIntoLine: 1,
    },
  })
  .add('Basic', () => <CreatableSelect options={optionsDefault} />);
