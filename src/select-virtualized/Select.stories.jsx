import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import random from 'generate-random-data';

import Select from './Select';

const optionsDefault = new Array(20).fill(null).map(() => ({
  value: random.guid(),
  label: `${random.maleFirstName()} - ${random.email('test.com.au')}`,
  extra: random.language(),
}));

console.log(optionsDefault);
console.log(random.maleFirstName());

const defaultValue = { ...optionsDefault[random.int(1, 19)] };

const buildOptionsSize = (size) => {
  let count = 0;
  return new Array(size / optionsDefault.length).fill(null).reduce(
    (acc) =>
      acc.concat(
        optionsDefault.map(({ value, label, extra }) => {
          count += 1;
          return {
            value: `${value}-${random.guid()}`,
            label: `${label} ${count || ''}`,
            extra,
          };
        }),
      ),
    [],
  );
};

storiesOf(`React Select Virtualized`, module)
  .addDecorator((story) => <div style={{ width: '500px' }}> {story()} </div>)
  .add('Basic', () => <Select options={optionsDefault} />, {
    notes: 'This is the basic definition for a select',
  })
  .add(
    'with default value',
    () => <Select defaultValue={defaultValue} options={optionsDefault} />,
    {
      notes: '',
    },
  )
  .add(
    'with 4500 elements',
    () => {
      const ops = buildOptionsSize(4500);
      return <Select options={ops} />;
    },
    {
      notes: '',
    },
  )
  .add(
    'with 8000 elements',
    () => {
      const ops = buildOptionsSize(8000);
      return <Select options={ops} />;
    },
    {
      notes: '',
    },
  )
  .add('disabled', () => <Select options={optionsDefault} isDisabled />, {
    notes: '',
  })
  .add(
    'clear element',
    () => {
      const selectRef = React.createRef();
      return (
        <Fragment>
          <button onClick={() => selectRef.current.clear()}>Click me for clearing the Select default value</button>
          <br />
          <Select ref={selectRef} defaultValue={defaultValue} options={optionsDefault} />
        </Fragment>
      );
    },
    {
      notes: '',
    },
  )
  .add(
    'focus input',
    () => {
      const selectRef = React.createRef();
      return (
        <Fragment>
          <button onClick={() => selectRef.current.focus()}>Click me for focusing the Select</button>
          <br />
          <Select ref={selectRef} defaultValue={defaultValue} options={optionsDefault} />
        </Fragment>
      );
    },
    {
      notes: '',
    },
  )
  .add(
    'callbacks',
    () => (
      <Select
        options={optionsDefault}
        onBlur={action('onBlur happened')}
        onValueChange={action('onValueChange happened')}
      />
    ),
    {
      notes: '',
    },
  )
  .add(
    'empty options',
    () => <Select noOptionsMessage={() => 'No Items To Display'} options={[]} />,
    {
      notes: '',
    },
  )
  .add(
    'custom label option',
    () => {
      const labelFormat = ({ label, extra }, { context }) => {
        // this can be any JSX
        if (context === 'value') return `${label} - ${extra}`;
        // this can be any JSX
        return `${label} - ${extra}`;
      };

      return <Select options={buildOptionsSize(3000)} defaultValue={defaultValue} formatOptionLabel={labelFormat} />;
    },
    {
      notes: '',
    },
  )
  .add(
    'grouped options',
    () => {
      const ops = [
        { label: `Group ${random.maleFirstName()}`, options: buildOptionsSize(40) },
        { label: `Group ${random.maleFirstName()}`, options: buildOptionsSize(40) },
        { label: `Group ${random.maleFirstName()}`, options: buildOptionsSize(40) },
        { label: `Group ${random.maleFirstName()}`, options: buildOptionsSize(40) },
        { label: `Group ${random.maleFirstName()}`, options: buildOptionsSize(40) },
        { label: `Group ${random.maleFirstName()}`, options: buildOptionsSize(40) },
        { label: `Group ${random.maleFirstName()}`, options: buildOptionsSize(40) },
        { label: `Group ${random.maleFirstName()}`, options: buildOptionsSize(40) },
      ];

      // this can be a css also
      const groupStyle = {
        background: 'lightcoral',
        height: '4em',
        'line-height': '4em',
        'text-align': 'center',
        'font-family': 'monospace',
      };

      const groupHeaderHeight = 50;

      const groupFormat = ({ label, options }) => (
        <div style={groupStyle}>
          {label} --- ({options.length}) items in this group
        </div>
      );

      return (
        <Select
          options={ops}
          defaultValue={defaultValue}
          formatGroupHeaderLabel={groupFormat}
          groupHeaderHeight={groupHeaderHeight}
        />
      );
    },
    {
      notes: '',
    },
  );
