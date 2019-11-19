import React from 'react';

import { FastOption } from '../../shared-components/fast-option';

export const flatVirtualizedListRowRenderer = ({ children, onOptionFocused, optionHeight, formatOptionLabel }) => ({
  key,
  index,
  style,
  isVisible,
  isScrolling,
}) => {
  // reality is that we do not need to pass the list here. we can work straight with the children.
  // since the actual behavior will be handled by the renderer
  const thisProps = children[index].props;

  // wait for https://github.com/JedWatson/react-select/issues/3656
  // the problem is that the always start now from the beginning and not from the last selected. so
  // the arrow functionality is lost between closing and opening again.
  // if (thisProps.isFocused && !isScrolling) {
  //   onOptionFocused({ data: thisProps.data, index, isVisible, isScrolling });
  // }

  return (
    <div className="flat-virtualized-item" key={key} style={style}>
      <FastOption
        data={thisProps.data}
        setValue={thisProps.setValue}
        isVisible={isVisible}
        isScrolling={isScrolling}
        optionHeight={optionHeight}
        // wait for https://github.com/JedWatson/react-select/issues/3656
        // the problem is that the always start now from the beginning and not from the last selected. so
        // the arrow functionality is lost between closing and opening again.
        // isFocused={thisProps.isFocused}
        isSelected={thisProps.isSelected}
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
};
