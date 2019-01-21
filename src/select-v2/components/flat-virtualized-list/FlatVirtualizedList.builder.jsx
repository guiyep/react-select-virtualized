import { components as ReactSelectComponents } from 'react-select';
import React from 'react';
import FlatVirtualizedList from './FlatVirtualizedList';
import { menuListItemHeight } from '../../helpers/select';

const List = ({ optionLabelHeight = menuListItemHeight, defaultValue, valueGetter }) => (props) => {
  const selectedValue = props.getValue() ? props.getValue()[0] : undefined;

  if (props.children && !props.children.length) {
    return <ReactSelectComponents.NoOptionsMessage {...props.children.props} />;
  }

  return (
    <FlatVirtualizedList
      {...props}
      optionLabelHeight={optionLabelHeight}
      selectedValue={selectedValue}
      defaultValue={defaultValue}
      valueGetter={valueGetter}
    />
  );
};

export default List;
