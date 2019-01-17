import { components as ReactSelectComponents } from 'react-select';
import React from 'react';
import MenuListVirtualized from '../virtualized-menu-list/MenuListVirtualized';
import { menuListItemHeight } from '../helpers/select-helpers';

const MenuList = ({ optionLabelHeight = menuListItemHeight, defaultValue, valueGetter, listItemClassName }) => (
  props,
) => {
  const selectedValue = props.getValue() ? props.getValue()[0] : undefined;

  if (props.children && !props.children.length) {
    return <ReactSelectComponents.NoOptionsMessage {...props.children.props} />;
  }

  return (
    <MenuListVirtualized
      {...props}
      optionLabelHeight={optionLabelHeight}
      selectedValue={selectedValue}
      defaultValue={defaultValue}
      valueGetter={valueGetter}
      listItemClassName={listItemClassName}
    />
  );
};

export default MenuList;
