import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Async from './Async';
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
  .add('Basic Async', () => {
    const loadOptions = (input, callback) => callback(buildOptionsSize(200));
    return <Async defaultOptions={optionsDefault} loadOptions={loadOptions} />;
  });
