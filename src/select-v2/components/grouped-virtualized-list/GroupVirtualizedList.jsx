import React, { useEffect, useRef, memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-virtualized';
import { getListHeight, getScrollIndex, getNextRowIndex } from '../../helpers/select';
import { getGroupRowHeight, virtualizeGroupedRowRenderer } from './helpers/grouped-list';

const GroupListVirtualized = (props) => {
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

  const onItemFocus = ({ index, isVisible }) => {
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
        totalLength: props.flatCollection.length,
        groupLength: props.children.length,
        optionLabelHeight: props.optionLabelHeight,
        groupLabelHeight: props.groupLabelHeight,
      }),
    [
      props.maxHeight,
      props.flatCollection.length,
      props.children.length,
      props.optionLabelHeight,
      props.groupLabelHeight,
    ],
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
        optionLabelHeight: props.optionLabelHeight,
        groupLabelHeight: props.groupLabelHeight,
      }),
    [props.flatCollection, props.optionLabelHeight, props.groupLabelHeight],
  );

  const rowRenderer = useMemo(
    () =>
      virtualizeGroupedRowRenderer({
        children: props.flatCollection,
        formatGroup: props.formatGroup,
        onItemFocus: onItemFocus,
      }),
    [props.flatCollection, props.formatGroup],
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
      // the style width 100% will override this prop, we need to set something big because it is a required field
      width={1000}
    />
  );
};

GroupListVirtualized.propTypes = {
  maxHeight: PropTypes.number,
  children: PropTypes.node.isRequired,
  optionLabelHeight: PropTypes.number,
  groupLabelHeight: PropTypes.number,
  selectedValue: PropTypes.object,
  defaultValue: PropTypes.object,
  valueGetter: PropTypes.func,
  formatGroup: PropTypes.func.isRequired,
  flatCollection: PropTypes.array.isRequired,
};

export default memo(GroupListVirtualized);
