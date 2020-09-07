import React, { memo } from 'react';
import { components as ReactSelectComponents } from 'react-select';
import GroupListVirtualized from './GroupVirtualizedList';
import { menuListItemHeight } from '@rsv-lib/defaults';
import { flattenGroupedOptions } from '@rsv-lib/utils';

const GroupedVirtualizedListFactory = ({
  formatGroupHeader,
  formatOptionLabel,
  optionHeight = menuListItemHeight,
  groupHeaderHeight = menuListItemHeight,
  defaultValue,
  valueGetter,
}) =>
  memo((props) => {
    const children = [...flattenGroupedOptions(props.children)];
    const selectedValue = props.getValue() ? props.getValue()[0] : undefined;

    if (props.children && !props.children.length) {
      return <ReactSelectComponents.NoOptionsMessage {...props.children.props} />;
    }

    return (
      <GroupListVirtualized
        {...props}
        flatCollection={children}
        selectedValue={selectedValue}
        formatGroupHeader={formatGroupHeader}
        formatOptionLabel={formatOptionLabel}
        optionHeight={optionHeight}
        groupHeaderHeight={groupHeaderHeight}
        valueGetter={valueGetter}
        defaultValue={defaultValue}
      />
    );
  });

export default GroupedVirtualizedListFactory;
