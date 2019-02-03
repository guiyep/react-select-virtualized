import { List } from 'react-virtualized';
import React, { useEffect, useRef, memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getListHeight, getScrollIndex, getNextRowIndex } from '../../helpers/select';
import { flatVirtualizedListRowRenderer } from './helpers/flat-list';

let ListVirtualized = (props) => {
  let queueScrollToIdx = undefined;
  let focusedItemIndex = undefined;

  const listComponent = useRef('virtualized-list');

  useEffect(() => {
    // only scroll to index when we have something in the queue of focused and not visible
    if (listComponent && queueScrollToIdx) {
      listComponent.current.scrollToRow(getNextRowIndex(focusedItemIndex, queueScrollToIdx, props.options));
      queueScrollToIdx = undefined;
    }
  });

  const onItemFocused = ({ index, isVisible }) => {
    if (index !== undefined && isVisible) {
      focusedItemIndex = index;
    } else if (index !== undefined && !isVisible && !queueScrollToIdx) {
      queueScrollToIdx = index;
    }
  };

  const height = useMemo(
    () =>
      getListHeight({
        maxHeight: props.maxHeight,
        totalSize: props.children.length,
        optionHeight: props.optionHeight,
      }),
    [props.maxHeight, props.children.length, props.optionHeight],
  );

  const scrollToIndex = useMemo(
    () =>
      getScrollIndex({
        children: props.options,
        selected: props.selectedValue || props.defaultValue,
        valueGetter: props.valueGetter,
      }),
    [props.options, props.selectedValue, props.defaultValue],
  );

  const rowRenderer = useMemo(
    () =>
      flatVirtualizedListRowRenderer({
        ...props,
        onItemFocused: onItemFocused,
      }),
    [props.children],
  );

  return (
    <List
      ref={listComponent}
      style={{ width: '100%' }}
      height={height}
      scrollToIndex={scrollToIndex}
      rowCount={props.children.length || 0}
      rowHeight={props.optionHeight}
      rowRenderer={rowRenderer}
      width={props.maxWidth}
    />
  );
};

ListVirtualized = memo(ListVirtualized);

ListVirtualized.propTypes = {
  maxHeight: PropTypes.number, // this prop is coming from react-select
  maxWidth: PropTypes.number, // the style width 100% will override this prop, we need to set something big because it is a required field
  children: PropTypes.node.isRequired,
  optionHeight: PropTypes.number,
  selectedValue: PropTypes.object,
  defaultValue: PropTypes.object,
  valueGetter: PropTypes.func,
  options: PropTypes.array.isRequired,
};

ListVirtualized.defaultProps = {
  valueGetter: (item) => item && item.value,
  maxWidth: 500,
};

ListVirtualized.displayName = 'ListVirtualized';

export default ListVirtualized;
