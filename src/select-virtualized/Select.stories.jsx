import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import random from 'generate-random-data';
import { withInfo } from '@storybook/addon-info';

import Select from './Select';

const optionsDefault = new Array(20).fill(null).map(() => ({
  value: random.guid(),
  label: `${random.maleFirstName()} - ${random.email('test.com.au')}`,
}));

const defaultValue = { ...optionsDefault[random.int(1, 19)] };

const buildOptionsSize = (size) => {
  return new Array(Math.round(size / optionsDefault.length)).fill(null).reduce(
    (acc) =>
      acc.concat(
        optionsDefault.map(({ value, label }) => {
          return {
            value: `${value}-${random.guid()}`,
            label: `${label} speaks ${random.language()}`,
          };
        }),
      ),
    [],
  );
};

const op50 = buildOptionsSize(50);
const op100 = buildOptionsSize(100);
const op300 = buildOptionsSize(300);
const op500 = buildOptionsSize(500);
const op800 = buildOptionsSize(800);
const op1000 = buildOptionsSize(1000);
const op1500 = buildOptionsSize(1500);
const ops2500 = buildOptionsSize(2500);
const ops4500 = buildOptionsSize(4500);
const ops6000 = buildOptionsSize(6000);
const ops8000 = buildOptionsSize(8000);
const ops10500 = buildOptionsSize(10500);
const group1 = buildOptionsSize(40);
const group2 = buildOptionsSize(40);
const group3 = buildOptionsSize(40);
const group4 = buildOptionsSize(40);
const group5 = buildOptionsSize(40);
const group6 = buildOptionsSize(40);
const group7 = buildOptionsSize(40);
const group8 = buildOptionsSize(40);

const opsGroup = [
  { label: `Group ${random.maleFirstName()}`, options: group1 },
  { label: `Group ${random.maleFirstName()}`, options: group2 },
  { label: `Group ${random.maleFirstName()}`, options: group3 },
  { label: `Group ${random.maleFirstName()}`, options: group4 },
  { label: `Group ${random.maleFirstName()}`, options: group5 },
  { label: `Group ${random.maleFirstName()}`, options: group6 },
  { label: `Group ${random.maleFirstName()}`, options: group7 },
  { label: `Group ${random.maleFirstName()}`, options: group8 },
];

storiesOf(`React Select Virtualized`, module)
  .addDecorator((story) => <div style={{ width: '500px' }}> {story()} </div>)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      source: true,
      maxPropsIntoLine: 1,
    },
  })
  .add('Basic', () => <Select options={optionsDefault} />)
  .add('with default value', () => <Select defaultValue={defaultValue} options={optionsDefault} />)
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
  .add('disabled select', () => <Select options={optionsDefault} isDisabled />)
  .add('clear select input', () => {
    const selectRef = React.createRef();
    return (
      <Fragment>
        <button className="button" style={{ width: '200px' }} onClick={() => selectRef.current.clear()}>
          Click me for clearing the Select default value
        </button>
        <br />
        <Select ref={selectRef} defaultValue={defaultValue} options={optionsDefault} />
      </Fragment>
    );
  })
  .add('focus select input', () => {
    const selectRef = React.createRef();
    return (
      <Fragment>
        <button className="button" style={{ width: '200px' }} onClick={() => selectRef.current.focus()}>
          Click me for focusing the Select
        </button>
        <br />
        <Select ref={selectRef} defaultValue={defaultValue} options={optionsDefault} />
      </Fragment>
    );
  })
  .add('callbacks action wit logs', () => (
    <Select
      options={optionsDefault}
      onBlur={action('onBlur happened')}
      onValueChange={action('onValueChange happened')}
    />
  ))
  .add('empty options in the select', () => <Select noOptionsMessage={() => 'No Items...'} options={[]} />, {
    notes: '',
  })
  .add('select with custom labels format', () => {
    const labelFormat = ({ label }, { context }) => {
      if (context === 'value') return `${label} - ${random.language()}`;
      return `${label} - ${random.language()}`;
    };

    return <Select options={ops2500} defaultValue={defaultValue} formatOptionLabel={labelFormat} />;
  })
  .add('grouped default', () => <Select options={opsGroup} defaultValue={defaultValue} grouped />)
  .add('grouped custom format', () => {
    // this can be a css also
    const groupStyle = {
      background: 'lightcoral',
      height: '4em',
      lineHeight: '4em',
      textAlign: 'center',
      fontFamily: 'monospace',
    };

    const groupHeaderHeight = 50;

    const groupFormat = ({ label, options }) => (
      <div style={groupStyle}>
        {label} --- ({options.length}) items in this group
      </div>
    );

    return (
      <Select
        options={opsGroup}
        defaultValue={defaultValue}
        formatGroupHeaderLabel={groupFormat}
        groupHeaderHeight={groupHeaderHeight}
      />
    );
  });
