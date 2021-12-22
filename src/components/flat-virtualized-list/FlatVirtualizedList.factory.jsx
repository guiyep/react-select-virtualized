import { components as ReactSelectComponents } from 'react-select';
import React, { memo } from 'react';
import { menuListItemHeight } from '@rsv-lib/defaults';
import FlatVirtualizedList from './FlatVirtualizedList';

const FlatVirtualizedListFactory = ({
  optionHeight = menuListItemHeight,
  defaultValue,
  valueGetter,
  formatOptionLabel,
}) =>
  memo((props) => {
    const selectedValue = props.getValue() ? props.getValue()[0] : undefined;

    if (props.children && !props.children.length) {
      return <ReactSelectComponents.NoOptionsMessage {...props.children.props} />;
    }

    return (
      <FlatVirtualizedList
        {...props}
        optionHeight={optionHeight}
        selectedValue={selectedValue}
        defaultValue={defaultValue}
        valueGetter={valueGetter}
        formatOptionLabel={formatOptionLabel}
      />
    );
  });

export default FlatVirtualizedListFactory;
