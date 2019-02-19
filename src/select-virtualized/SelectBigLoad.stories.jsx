import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Select from './Select';
import {
  op50,
  op100,
  op300,
  op500,
  op800,
  op1000,
  op1500,
  ops2500,
  ops4500,
  ops6000,
  ops8000,
  ops10500,
  buildOptionsSize,
  opsGroup20000,
} from '../data';

storiesOf(`React Select Virtualized/big data`, module)
  .addDecorator((story) => <div style={{ width: '500px' }}> {story()} </div>)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      source: true,
      maxPropsIntoLine: 1,
    },
  })
  .add('with 50 elements', () => <Select options={op50} />)
  .add('with 100 elements', () => <Select options={op100} />)
  .add('with 300 elements', () => <Select options={op300} />)
  .add('with 500 elements', () => <Select options={op500} />)
  .add('with 800 elements', () => <Select options={op800} />)
  .add('with 1000 elements', () => <Select options={op1000} />)
  .add('with 1500 elements', () => <Select options={op1500} />)
  .add('with 2500 elements', () => <Select options={ops2500} />)
  .add('with 4500 elements', () => <Select options={ops4500} />)
  .add('with 6000 elements', () => <Select options={ops6000} />)
  .add('with 8000 elements', () => <Select options={ops8000} />)
  .add('with 10500 elements', () => <Select options={ops10500} />)
  .add('with 30000 elements (you will need to wait for the creation of the elements)', () => (
    <Select options={buildOptionsSize(30000)} />
  ))
  .add('with 100000 elements (you will need to wait for the creation of the elements)', () => (
    <Select options={buildOptionsSize(100000)} />
  ))
  .add('with 20000 grouped elements', () => <Select options={opsGroup20000} grouped />);
