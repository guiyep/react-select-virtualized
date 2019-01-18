import React, { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-virtualized';
import { calculateMenuListHeight, calculateScrollIndex, calculateNextRowIndex } from '../helpers/select-helpers';
import { calculateGroupRowHeight, virtualizeGroupedRowRenderer } from '../helpers/select-group-list-helper';

const GroupListVirtualized = (props) => {
  let queueScrollToIdx = undefined;
  let focusedItemIndex = undefined;

  const listComponent = useRef('virtualized-list-grouped');

  useEffect(() => {
    // only scroll to index when we have something in the queue of focused and not visible
    if (listComponent && queueScrollToIdx) {
      listComponent.current.scrollToRow(
        calculateNextRowIndex(focusedItemIndex, queueScrollToIdx, props.flatCollection),
      );
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
        totalLength: props.flatCollection.length,
        groupLength: props.children.length,
        optionLabelHeight: props.optionLabelHeight,
        groupLabelHeight: props.groupLabelHeight,
      })}
      scrollToIndex={calculateScrollIndex({
        children: props.flatCollection,
        selected: props.selectedValue || props.defaultValue,
        valueGetter: props.valueGetter,
      })}
      rowCount={props.flatCollection.length || 0}
      rowHeight={calculateGroupRowHeight({
        children: props.flatCollection,
        optionLabelHeight: props.optionLabelHeight,
        groupLabelHeight: props.groupLabelHeight,
      })}
      rowRenderer={virtualizeGroupedRowRenderer({
        children: props.flatCollection,
        formatGroup: props.formatGroup,
        listItemClassName: props.listItemClassName,
        onItemFocus: onItemFocus,
      })}
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
  listItemClassName: PropTypes.string,
  flatCollection: PropTypes.array.isRequired,
};

export default memo(GroupListVirtualized);
