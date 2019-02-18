import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Select from './Select';
import { optionsDefault, opsGroup, defaultValue, op1500, ops2500 } from '../data';

storiesOf(`React Select Virtualized/props`, module)
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
  .add('with minimum input to 3', () => (
    <Select options={op1500} minimumInputSearch={3} />
  ))
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
  .add('empty options in the select', () => <Select noOptionsMessage={() => 'No Items...'} options={[]} />)
  .add('select with custom labels format', () => {
    const labelFormat = ({ label, lang }, { context }) => {
      if (context === 'value') return `${label} - ${lang}`;
      return `${label} - ${lang}`;
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
