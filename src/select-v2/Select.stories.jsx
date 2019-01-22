import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

import Select from './Select';

const optionsDefault = [
  { value: 'chocolate', label: 'Chocolate', extra: 'yes!, it is very good' },
  { value: 'strawberry', label: 'Strawberry', extra: 'mmmmm maybe' },
  { value: 'vanilla', label: 'Vanilla', extra: 'little boring' },
  { value: 'dulcedeleche', label: 'Dulce De Leche', extra: 'yes!, the best!' },
];

const defaultValue = { ...optionsDefault[3] };

const buildOptionsSize = (size) => {
  let count = 0;
  return new Array(size / optionsDefault.length).fill(null).reduce(
    (acc) =>
      acc.concat(
        optionsDefault.map(({ value, label, extra }) => {
          count += 1;
          return {
            value: `${value} ${count || ''}`,
            label: `${label} ${count || ''}`,
            extra,
          };
        }),
      ),
    [],
  );
};

storiesOf(`Select-v2`, module)
  .addDecorator((story) => <div style={{ width: '500px' }}> {story()} </div>)
  .add('Basic Select', () => <Select options={optionsDefault} />, {
    notes: 'This is the basic definition for a select',
  })
  .add('Select with default value', () => <Select defaultValue={defaultValue} options={optionsDefault} />, {
    notes: '',
  })
  .add(
    'Select with 5000 elements',
    () => {
      const ops = buildOptionsSize(5000);
      return <Select options={ops} />;
    },
    {
      notes: '',
    },
  )
  .add(
    'Select with 10000 elements',
    () => {
      const ops = buildOptionsSize(10000);
      return <Select options={ops} />;
    },
    {
      notes: '',
    },
  )
  .add('Select disabled', () => <Select options={optionsDefault} isDisabled />, {
    notes: '',
  })
  .add(
    'Select clear progra',
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
    'Select focus',
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
    'Select handlers',
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
  .add('Select without any result', () => <Select noOptionsMessage={() => 'No Items To Display'} options={[]} />, {
    notes: '',
  })
  .add(
    'Select combined item result',
    () => {
      const labelFormat = ({ label, extra }, { context }) => {
        // this can be any JSX
        if (context === 'value') return `${label} - Should I try it? ${extra}`;
        // this can be any JSX
        return `${label} - Should I try it? ${extra}`;
      };

      return <Select options={buildOptionsSize(3000)} defaultValue={defaultValue} formatOptionLabel={labelFormat} />;
    },
    {
      notes: '',
    },
  )
  .add(
    'Select grouped result',
    () => {
      const op = [
        { label: 'Group 1', options: buildOptionsSize(40) },
        { label: 'Group 2', options: buildOptionsSize(40) },
        { label: 'Group 3', options: buildOptionsSize(40) },
        { label: 'Group 4', options: buildOptionsSize(40) },
        { label: 'Group 5', options: buildOptionsSize(40) },
      ];

      const groupFormat = ({ label, options }) => (
        <div style={{ background: 'grey', height: '50px' }}>
          {label} - {options.length} items in this group
        </div>
      );

      return <Select options={op} defaultValue={defaultValue} formatGroupHeaderLabel={groupFormat} groupHeaderHeight={50} />;
    },
    {
      notes: '',
    },
  );
