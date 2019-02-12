import React from 'react';

import { FastOption } from '../../fast-option';

export const flatVirtualizedListRowRenderer = ({ children, onOptionFocused, optionHeight }) => ({
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
    <div className="flat-virtualized-item" key={key} style={style}>
      <FastOption
        data={thisProps.data}
        setValue={thisProps.setValue}
        isVisible={isVisible}
        isScrolling={isScrolling}
        optionHeight={optionHeight}
      />
    </div>
  );
};
