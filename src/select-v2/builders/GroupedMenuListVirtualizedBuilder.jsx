import React from 'react';
import { components as ReactSelectComponents } from 'react-select';
import GroupMenuListVirtualized from '../virtualized-menu-list/GroupMenuListVirtualized';
import { menuListItemHeight } from '../helpers/select-helpers';
import { flatOptionsChildren } from '../helpers/select-group-list-helper';

const MenuListWithGroup = ({
  formatGroup,
  optionLabelHeight = menuListItemHeight,
  groupLabelHeight = menuListItemHeight,
  defaultValue,
  valueGetter,
  listItemClassName,
}) => (props) => {
  const children = [...flatOptionsChildren(props.children)];
  const selectedValue = props.getValue() ? props.getValue()[0] : undefined;

  if (props.children && !props.children.length) {
    return <ReactSelectComponents.NoOptionsMessage {...props.children.props} />;
  }

  return (
    <GroupMenuListVirtualized
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

export default MenuListWithGroup;
