import React from 'react';
import { components as ReactSelectComponents } from 'react-select';
import classnames from 'classnames';

export const flatVirtualizedListRowRenderer = ({ children, onOptionFocused }) => ({
  key,
  index,
  style,
  isVisible,
  isScrolling,
}) => {
  const thisProps = children[index].props;

  if (thisProps.isFocused) {
    onOptionFocused({ data: thisProps.data, index, isVisible, isScrolling });
  }

  return (
    <div
      className={classnames('flat-virtualized-item', {
        'flat-virtualized-item-focused': !isScrolling && thisProps.isFocused && isVisible,
      })}
      key={key}
      style={style}
    >
      {<ReactSelectComponents.Option {...thisProps} isFocused={false} />}
    </div>
  );
};
