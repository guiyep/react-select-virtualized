import React, { useMemo, memo } from 'react';
import { components as ReactSelectComponents } from 'react-select';
import GroupListVirtualized from './GroupVirtualizedList';
import { menuListItemHeight } from '../../helpers/defaults';
import { flattenOptions } from './helpers/grouped-list.jsx';

const GroupedVirtualizedListFactory = ({
  formatGroupHeader,
  optionHeight = menuListItemHeight,
  groupHeaderHeight = menuListItemHeight,
  defaultValue,
  valueGetter,
}) =>
  memo((props) => {
    const children = useMemo(() => [...flattenOptions(props.children)], [props.children]);
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
        optionHeight={optionHeight}
        groupHeaderHeight={groupHeaderHeight}
        valueGetter={valueGetter}
        defaultValue={defaultValue}
      />
    );
  });

export default GroupedVirtualizedListFactory;
