import React, { useEffect, useRef, memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-virtualized';
import { getListHeight, getScrollIndex, getNextRowIndex } from '../../helpers/getters';
import { getGroupRowHeight, groupVirtualizedListRowRenderer } from './helpers/grouped-list';

let GroupListVirtualized = (props) => {
  let queueScrollToIdx = undefined;
  let focusedItemIndex = undefined;

  const listComponent = useRef('virtualized-list-grouped');

  useEffect(() => {
    // only scroll to index when we have something in the queue of focused and not visible
    if (listComponent && queueScrollToIdx) {
      listComponent.current.scrollToRow(getNextRowIndex(focusedItemIndex, queueScrollToIdx, props.flatCollection));
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
        totalSize: props.flatCollection.length,
        groupSize: props.children.length,
        optionHeight: props.optionHeight,
        groupHeaderHeight: props.groupHeaderHeight,
      }),
    [props.maxHeight, props.flatCollection.length, props.children.length, props.optionHeight, props.groupHeaderHeight],
  );

  const scrollToIndex = useMemo(
    () =>
      getScrollIndex({
        children: props.flatCollection,
        selected: props.selectedValue || props.defaultValue,
        valueGetter: props.valueGetter,
      }),
    [props.flatCollection, props.selectedValue, props.defaultValue],
  );

  const rowHeight = useMemo(
    () =>
      getGroupRowHeight({
        children: props.flatCollection,
        optionHeight: props.optionHeight,
        groupHeaderHeight: props.groupHeaderHeight,
      }),
    [props.flatCollection, props.optionHeight, props.groupHeaderHeight],
  );

  const rowRenderer = useMemo(
    () =>
      groupVirtualizedListRowRenderer({
        children: props.flatCollection,
        formatGroupHeader: props.formatGroupHeader,
        onItemFocused: onItemFocused,
      }),
    [props.flatCollection, props.formatGroupHeader],
  );

  return (
    <List
      ref={listComponent}
      style={{ width: '100%' }}
      height={height}
      scrollToIndex={scrollToIndex}
      rowCount={props.flatCollection.length || 0}
      rowHeight={rowHeight}
      rowRenderer={rowRenderer}
      width={props.maxWidth}
    />
  );
};

GroupListVirtualized = memo(GroupListVirtualized);

GroupListVirtualized.propTypes = {
  maxHeight: PropTypes.number, // this prop is coming from react-select
  maxWidth: PropTypes.number, // the style width 100% will override this prop, we need to set something big because it is a required field
  children: PropTypes.node.isRequired,
  optionHeight: PropTypes.number,
  groupHeaderHeight: PropTypes.number,
  selectedValue: PropTypes.object,
  defaultValue: PropTypes.object,
  valueGetter: PropTypes.func,
  formatGroupHeader: PropTypes.func.isRequired,
  flatCollection: PropTypes.array.isRequired,
};

GroupListVirtualized.defaultProps = {
  valueGetter: (item) => item && item.value,
  maxWidth: 500,
};

GroupListVirtualized.displayName = 'GroupListVirtualized';

export default GroupListVirtualized;
