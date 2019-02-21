import React, { useEffect, useCallback, memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { List, InfiniteLoader } from 'react-virtualized';
import { getListHeight, getScrollIndex, getNextRowIndex } from '../../helpers/getters';
import { groupVirtualizedListRowRenderer } from './helpers/grouped-list.jsx';
import { getGroupRowHeight } from './helpers/getters';

let GroupListVirtualized = (props) => {
  let queueScrollToIdx = undefined;
  let focusedItemIndex = undefined;
  let listComponent;

  useEffect(() => {
    // only scroll to index when we have something in the queue of focused and not visible
    if (listComponent && queueScrollToIdx) {
      listComponent.current.scrollToRow(getNextRowIndex(focusedItemIndex, queueScrollToIdx, props.flatCollection));
      queueScrollToIdx = undefined;
    }
  });

  const onOptionFocused = useCallback(({ index, isVisible }) => {
    if (index !== undefined && isVisible) {
      focusedItemIndex = index;
    } else if (index !== undefined && !isVisible && !queueScrollToIdx) {
      queueScrollToIdx = index;
    }
  });

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

  const list = [];

  const rowRenderer = useMemo(
    () =>
      groupVirtualizedListRowRenderer({
        children: props.flatCollection,
        formatGroupHeader: props.formatGroupHeader,
        onOptionFocused: onOptionFocused,
        optionHeight: props.optionHeight,
        formatOptionLabel: props.formatOptionLabel,
      }),
    [list, props.formatGroupHeader],
  );

  const isRowLoaded = useCallback(({ index }) => {
    return !!list[index];
  });

  const loadMoreRows = useCallback(({ startIndex, stopIndex }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = list.concat(props.flatCollection.slice(startIndex, stopIndex));
        resolve(result);
      }, 100);
    });
  });

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      threshold={props.threshold}
      loadMoreRows={loadMoreRows}
      rowCount={props.children.length || 0}
      minimumBatchSize={props.minimumBatchSize}
    >
      {({ onRowsRendered, registerChild }) => (
        <List
          ref={(element) => {
            registerChild(element);
            listComponent = {
              current: element,
            };
            return element;
          }}
          onRowsRendered={onRowsRendered}
          style={{ width: '100%' }}
          height={height}
          scrollToIndex={scrollToIndex}
          rowCount={props.flatCollection.length || 0}
          rowHeight={rowHeight}
          rowRenderer={rowRenderer}
          width={props.maxWidth}
        />
      )}
    </InfiniteLoader>
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
  formatOptionLabel: PropTypes.func,
  flatCollection: PropTypes.array.isRequired,
  minimumBatchSize: PropTypes.number,
};

GroupListVirtualized.defaultProps = {
  valueGetter: (item) => item && item.value,
  maxWidth: 9999,
  formatOptionLabel: undefined,
  minimumBatchSize: 1000,
};

GroupListVirtualized.displayName = 'GroupListVirtualized';

export default GroupListVirtualized;
