import React from 'react';
import { components as ReactSelectComponents } from 'react-select';

export const flatVirtualizedListRowRenderer = ({ children, onItemFocused }) => ({
  key,
  index,
  style,
  isVisible,
  isScrolling,
}) => {
  const currentProps = children[index].props;

  if (currentProps.isFocused) {
    onItemFocused({ data: currentProps.data, index, isVisible, isScrolling });
  }

  return (
    <div className="flat-virtualized-item" key={key} style={style}>
      {
        <ReactSelectComponents.Option
          {...currentProps}
          isFocused={!isScrolling && currentProps.isFocused && isVisible}
        />
      }
    </div>
  );
};
