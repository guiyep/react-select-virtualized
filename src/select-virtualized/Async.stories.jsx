import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Async } from './index';
import { optionsDefault, opsGroup20000, buildOptionsSize } from '../data';

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
  .add('Async with default', () => {
    return <Async defaultOptions={optionsDefault} loadOptions={loadListOptions} />;
  })
  .add('Async without default', () => {
    return <Async loadOptions={loadListOptions} />;
  })
  .add('Async with default grouped', () => {
    return <Async defaultOptions={opsGroup20000} loadOptions={loadGroupedOptions} grouped />;
  })
  .add('Async without default grouped', () => {
    return <Async loadOptions={loadGroupedOptions} grouped />;
  });
