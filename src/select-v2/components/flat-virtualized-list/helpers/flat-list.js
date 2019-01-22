import { components as ReactSelectComponents } from 'react-select';
import React from 'react';

export const virtualizeRowRenderer = ({ children, onItemFocused }) => ({
  key,
  index,
  style,
  isVisible,
}) => {
  const currentProps = children[index].props;

  if (currentProps.isFocused) {
    onItemFocused({ data: currentProps.data, index, isVisible });
  }

  return (
    <div className="flat-virtualized-item" key={key} style={style}>
      {<ReactSelectComponents.Option {...currentProps} />}
    </div>
  );
};
