import React, { useMemo } from 'react';
import { components as ReactSelectComponents } from 'react-select';
import GroupListVirtualized from './GroupVirtualizedList';
import { menuListItemHeight } from '../../helpers/defaults';
import { flatOptionsChildren } from './helpers/grouped-list';

const ListWithGroup = ({
  formatGroupHeader,
  optionHeight = menuListItemHeight,
  groupHeaderHeight = menuListItemHeight,
  defaultValue,
  valueGetter,
}) => (props) => {
  const children = useMemo(() => [...flatOptionsChildren(props.children)], [props.children]);
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
};

export default ListWithGroup;
