import React, { Component } from 'react';
import Select from 'react-select-virtualized';
import random from 'generate-random-data';

const optionsDefault = new Array(20).fill(null).map(() => ({
  value: random.guid(),
  label: `${random.maleFirstName()} - ${random.email('test.com.au')}`,
}));

export default class App extends Component {
  render() {
    return (
      <div>
        <Select options={optionsDefault} />
      </div>
    );
  }
}
