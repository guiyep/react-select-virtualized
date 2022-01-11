import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { optionsDefault, opsGroup, defaultValue, op1500, ops2500, op100 } from '@rsv-lib/data';
import Select from './_SelectTablePropsStoryFix';
import fileSizeRef from '../../../size.json';

storiesOf(`React Select Virtualized/props`, module)
  .addDecorator((story) => <div style={{ width: '30em' }}> {story()} </div>)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      source: true,
      maxPropsIntoLine: 1,
    },
  })
  .add('Basic', () => <Select options={optionsDefault} />)
  .add('with default value uncontrolled', () => <Select defaultValue={defaultValue} options={optionsDefault} />)
  .add('with default value controlled', () => <Select value={defaultValue} options={optionsDefault} />)
  .add(
    'with value controlled',
    withState({ value: defaultValue })(({ store }) => (
      <div>
        <button
          type="button"
          onClick={() => {
            store.set({ value: null });
            action(`clear`)({ value: null });
          }}
        >
          reset
        </button>
        <Select
          value={store.state.value}
          options={optionsDefault}
          onChange={(val) => {
            store.set({ value: val });
          }}
        />
      </div>
    )),
  )
  .add('with minimum input to 3', () => <Select options={op1500} minimumInputSearch={3} />)
  .add('with filterOptions(value with $$$number) less than 1000', () => {
    const op1500Mapped = op100.map((option, index) => ({ ...option, value: `${option.value}$$$${index}` }));
    const customFilter = (option, rawInput) => option && option.value.indexOf(rawInput) >= 0;
    return <Select options={op1500Mapped} filterOption={customFilter} />;
  })
  .add('with filterOptions(value with $$$number)', () => {
    const op1500Mapped = op1500.map((option, index) => ({ ...option, value: `${option.value}$$$${index}` }));
    const customFilter = (option, rawInput) => option && option.value.indexOf(rawInput) >= 0;
    return <Select options={op1500Mapped} filterOption={customFilter} />;
  })
  .add('disabled select', () => <Select options={optionsDefault} isDisabled />)
  .add('empty options in the select', () => <Select noOptionsMessage={() => 'No Items...'} options={[]} />)
  .add('select with custom labels format', () => {
    const labelFormat = ({ label, lang }, { context }) => {
      if (context === 'value') return `${label} - ${lang}`;
      return <div style={{ border: '1px solid blue' }}>{`${label} - ${lang}`}</div>;
    };

    return <Select options={ops2500} defaultValue={defaultValue} formatOptionLabel={labelFormat} />;
  })
  .add('select with custom labels format 2', () => {
    const labelFormat = ({ label, lang }, { context }) => {
      if (context === 'value') return `${label} - ${lang}`;
      return `${label} - this is great`;
    };

    return <Select options={ops2500} defaultValue={defaultValue} formatOptionLabel={labelFormat} />;
  })
  .add('grouped default', () => <Select options={opsGroup} defaultValue={defaultValue} grouped />)
  .add('with grouped filterOptions(use index)', () => {
    const customFilter = (option, rawInput) => option && option.value.indexOf(rawInput) >= 0;
    return <Select options={opsGroup} filterOption={customFilter} grouped />;
  })
  .add(
    'grouped with value controlled',
    withState({ value: defaultValue })(({ store }) => (
      <Select
        value={store.state.value}
        options={opsGroup}
        onChange={(val) => {
          store.set({ value: val });
          action(`onChange`)(val);
        }}
        grouped
      />
    )),
  )
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
        grouped
      />
    );
  })
  .add('menuIsOpen passed from outside', () => {
    const [isMenuOpen, setMenuStateOpen] = useState(true);
    return (
      <>
        <button type="button" onClick={() => setMenuStateOpen((currentMenuState) => !currentMenuState)}>
          Toggle Menu Open State
        </button>
        <Select options={op1500} menuIsOpen={isMenuOpen} />
      </>
    );
  })
  .add('open selector', () => <Select options={op1500} defaultValue={op1500[3]} menuIsOpen />)
  .add('Bundle size exceed 8kb max', () => {
    const delta = fileSizeRef.new.delta;
    if (delta > 8000) {
      return `your file size exceeds the 8kb delta between builds. It is ${fileSizeRef.new.prettyDelta}, original: ${fileSizeRef.old.prettySize}, new: ${fileSizeRef.new.prettySize}`;
    }
    return 'your file size is OK.';
  });
