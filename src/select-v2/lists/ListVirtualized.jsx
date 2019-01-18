import { List } from 'react-virtualized';
import React, { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { calculateMenuListHeight, calculateScrollIndex, calculateNextRowIndex } from '../helpers/select-helpers';
import { virtualizeRowRenderer } from '../helpers/select-list-helper';

const ListVirtualized = (props) => {
  let queueScrollToIdx = undefined;
  let focusedItemIndex = undefined;

  const listComponent = useRef('virtualized-list');

  useEffect(() => {
    // only scroll to index when we have something in the queue of focused and not visible
    if (listComponent && queueScrollToIdx) {
      listComponent.current.scrollToRow(calculateNextRowIndex(focusedItemIndex, queueScrollToIdx, props.options));
      queueScrollToIdx = undefined;
    }
  });

  const onItemFocus = ({ index, isVisible }) => {
    if (index !== undefined && isVisible) {
      focusedItemIndex = index;
    } else if (index !== undefined && !isVisible && !queueScrollToIdx) {
      queueScrollToIdx = index;
    }
  };

  return (
    <List
      ref={listComponent}
      style={{ width: '100%' }}
      height={calculateMenuListHeight({
        maxHeight: props.maxHeight,
        totalLength: props.children.length,
        optionLabelHeight: props.optionLabelHeight,
      })}
      scrollToIndex={calculateScrollIndex({
        children: props.options,
        selected: props.selectedValue || props.defaultValue,
        valueGetter: props.valueGetter,
      })}
      rowCount={props.children.length || 0}
      rowHeight={props.optionLabelHeight}
      rowRenderer={virtualizeRowRenderer({
        ...props,
        onItemFocus: onItemFocus,
      })}
      // the style width 100% will override this prop, we need to set something big because it is a required field
      width={1000}
    />
  );
};

ListVirtualized.propTypes = {
  maxHeight: PropTypes.number,
  children: PropTypes.node.isRequired,
  optionLabelHeight: PropTypes.number,
  selectedValue: PropTypes.object,
  defaultValue: PropTypes.object,
  valueGetter: PropTypes.func,
  listItemClassName: PropTypes.string,
  options: PropTypes.array.isRequired,
};

export default memo(ListVirtualized);
