import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Async } from './index';
import { optionsDefault, buildOptionsSize } from '../data';

storiesOf(`React Select Virtualized/Async`, module)
  .addDecorator((story) => <div style={{ width: '30em' }}> {story()} </div>)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      source: true,
      maxPropsIntoLine: 1,
    },
  })
  .add('Async with default', () => {
    const loadOptions = (input, callback) => setTimeout(() => callback(buildOptionsSize(2000)), 200);
    return <Async defaultOptions={optionsDefault} loadOptions={loadOptions} />;
  })
  .add('Async without default', () => {
    const loadOptions = (input, callback) => setTimeout(() => callback(buildOptionsSize(2000)), 200);
    return <Async loadOptions={loadOptions} />;
  });
