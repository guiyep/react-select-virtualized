import { components as ReactSelectComponents } from 'react-select';
import React from 'react';
import ListVirtualized from '../lists/ListVirtualized';
import { menuListItemHeight } from '../helpers/select-helpers';

const List = ({ optionLabelHeight = menuListItemHeight, defaultValue, valueGetter, listItemClassName }) => (
  props,
) => {
  const selectedValue = props.getValue() ? props.getValue()[0] : undefined;

  if (props.children && !props.children.length) {
    return <ReactSelectComponents.NoOptionsMessage {...props.children.props} />;
  }

  return (
    <ListVirtualized
      {...props}
      optionLabelHeight={optionLabelHeight}
      selectedValue={selectedValue}
      defaultValue={defaultValue}
      valueGetter={valueGetter}
      listItemClassName={listItemClassName}
    />
  );
};

export default List;
