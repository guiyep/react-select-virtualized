import React from 'react';

import { FastOption } from '@rsv-components/fast-option';

export const flatVirtualizedListRowRenderer =
  ({ children, onOptionFocused, optionHeight, formatOptionLabel }) =>
  ({ key, index, style, isVisible, isScrolling }) => {
    // reality is that we do not need to pass the list here. we can work straight with the children.
    // since the actual behavior will be handled by the renderer
    const thisProps = children[index].props;

    if (thisProps.isFocused && !isScrolling) {
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
          isFocused={thisProps.isFocused}
          isSelected={thisProps.isSelected}
          formatOptionLabel={formatOptionLabel}
        />
      </div>
    );
  };
