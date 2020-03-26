import { List, InfiniteLoader, AutoSizer } from 'react-virtualized';
import React, { useEffect, memo, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getListHeight, getScrollIndex, getNextRowIndex } from '@rsv-lib/getters';
import { flatVirtualizedListRowRenderer } from '@rsv-lib/renderers';
import { useDebouncedCallback } from '@rsv-hooks/use-debaunced-callback';

let FlatListVirtualized = (props) => {
  let listComponent;

  const [focusedItemIndex, setFocusedItemIndex] = useState(undefined);
  const [queueScrollToIdx, setQueueScrollToIdx] = useState(undefined);

  const {
    maxHeight,
    children,
    optionHeight,
    options,
    selectedValue,
    defaultValue,
    valueGetter,
    formatOptionLabel,
  } = props;

  useEffect(() => {
    // only scroll to index when we have something in the queue of focused and not visible
    if (listComponent && queueScrollToIdx !== undefined && focusedItemIndex !== undefined) {
      listComponent.current.scrollToRow(getNextRowIndex(focusedItemIndex, queueScrollToIdx, options));
      setQueueScrollToIdx(undefined);
    }
  }, [listComponent, queueScrollToIdx, focusedItemIndex, options]);

  const onOptionFocused = useCallback(
    ({ index, isVisible }) => {
      // enqueue the changes to the task queue so we do not interrupt rendering
      setTimeout(() => {
        if (index !== undefined && focusedItemIndex !== index && isVisible) {
          setFocusedItemIndex(index);
        } else if (index !== undefined && !isVisible && !queueScrollToIdx) {
          setQueueScrollToIdx(index);
        }
      }, 100);
    },
    [setFocusedItemIndex, focusedItemIndex, setQueueScrollToIdx, queueScrollToIdx],
  );

  const height = useMemo(
    () =>
      getListHeight({
        maxHeight,
        totalSize: children.length,
        optionHeight,
      }),
    [maxHeight, children.length, optionHeight],
  );

  const scrollToIndex = useMemo(
    () =>
      getScrollIndex({
        children: options,
        selected: selectedValue || defaultValue,
        valueGetter,
      }),
    [options, selectedValue, defaultValue, valueGetter],
  );

  const rowRenderer = useMemo(
    () =>
      flatVirtualizedListRowRenderer({
        children,
        onOptionFocused,
        optionHeight,
        formatOptionLabel,
      }),
    [children, onOptionFocused, optionHeight, formatOptionLabel],
  );

  let list = [];

  const isRowLoaded = useCallback(
    ({ index }) => {
      return !!list[index];
    },
    [list],
  );

  const loadMoreRows = useDebouncedCallback(({ startIndex, stopIndex }) => {
    for (let i = startIndex; i <= stopIndex; i++) {
      list.push(children[i]);
    }
  }, 100);

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
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
              height={height}
              scrollToIndex={scrollToIndex}
              rowCount={props.children.length}
              rowHeight={props.optionHeight}
              rowRenderer={rowRenderer}
              width={width}
            />
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};

FlatListVirtualized = memo(FlatListVirtualized);

FlatListVirtualized.propTypes = {
  maxHeight: PropTypes.number, // this prop is coming from react-select
  children: PropTypes.node.isRequired,
  optionHeight: PropTypes.number,
  selectedValue: PropTypes.object,
  defaultValue: PropTypes.object,
  valueGetter: PropTypes.func,
  options: PropTypes.array.isRequired,
  minimumBatchSize: PropTypes.number,
};

FlatListVirtualized.defaultProps = {
  valueGetter: (item) => item && item.value,
  maxHeight: 200,
  minimumBatchSize: 100,
};

FlatListVirtualized.displayName = 'FlatListVirtualized';

export default FlatListVirtualized;
