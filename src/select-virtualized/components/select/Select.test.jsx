import React from 'react';
import Select from './Select';
import renderer from 'react-test-renderer';
import { optionsDefaultStatic, defaultValueStatic } from '../../data';

it('renders correctly', () => {
  const tree = renderer.create(<Select options={optionsDefaultStatic} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with default value', () => {
  const tree = renderer.create(<Select defaultValue={defaultValueStatic} options={optionsDefaultStatic} />).toJSON();
  expect(tree).toMatchSnapshot();
});
