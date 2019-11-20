import React from 'react';
import Async from './Async';
import renderer from 'react-test-renderer';
import { defaultValueStatic } from '@rsv-lib/data';

const loadListOptions = jest.fn();

it('renders correctly', () => {
  const tree = renderer.create(<Async loadOptions={loadListOptions} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with default value', () => {
  const tree = renderer.create(<Async defaultValue={defaultValueStatic} loadOptions={loadListOptions} />).toJSON();
  expect(tree).toMatchSnapshot();
});