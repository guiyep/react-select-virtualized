import React, { useMemo } from 'react';
import { components as ReactSelectComponents } from 'react-select';
import GroupListVirtualized from '../lists/GroupListVirtualized';
import { menuListItemHeight } from '../helpers/select-helpers';
import { flatOptionsChildren } from '../helpers/select-group-list-helper';

const ListWithGroup = ({
  formatGroup,
  optionLabelHeight = menuListItemHeight,
  groupLabelHeight = menuListItemHeight,
  defaultValue,
  valueGetter,
  listItemClassName,
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
      formatGroup={formatGroup}
      optionLabelHeight={optionLabelHeight}
      groupLabelHeight={groupLabelHeight}
      valueGetter={valueGetter}
      listItemClassName={listItemClassName}
      defaultValue={defaultValue}
    />
  );
};

export default ListWithGroup;
