import { components as ReactSelectComponents } from 'react-select';
import React from 'react';

export const virtualizeRowRenderer = ({ children, listItemClassName, onItemFocus }) => ({
  key,
  index,
  style,
  isVisible,
}) => {
  const currentProps = children[index].props;

  if (currentProps.isFocused) {
    onItemFocus({ data: currentProps.data, index, isVisible });
  }

  return (
    <div className={listItemClassName} key={key} style={style}>
      {<ReactSelectComponents.Option {...currentProps} />}
    </div>
  );
};
