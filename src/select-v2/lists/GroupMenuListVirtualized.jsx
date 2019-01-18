import React, { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-virtualized';
import { calculateMenuListHeight, calculateScrollIndex, calculateNextRowIndex } from '../helpers/select-helpers';
import { calculateGroupRowHeight, virtualizeGroupedRowRenderer } from '../helpers/select-group-list-helper';

const GroupMenuListVirtualized = () => {
  let queueScrollToIdx = undefined;
  let focusedItemIndex = undefined;

  const listComponent = useRef('virtualized-list-grouped');

  useEffect(() => {
    // only scroll to index when we have something in the queue of focused and not visible
    if (listComponent && queueScrollToIdx) {
      listComponent.scrollToRow(calculateNextRowIndex(focusedItemIndex, queueScrollToIdx, props.options));
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

// class GroupMenuListVirtualized extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.onItemFocus = this.onItemFocus.bind(this);
//     // queue any update on the focus position so we can update the scroll to that value if it is not visible.
//     this.queueScrollToIdx = undefined;
//     // save the last focused item. We use this value to know the the scroll is going down or up
//     this.focusedItemIndex = undefined;
//   }

//   componentDidUpdate() {
//     // only scroll to index when we have something in the queue of focused and not visible
//     if (this.listComponent && this.queueScrollToIdx) {
//       this.listComponent.scrollToRow(
//         calculateNextRowIndex(this.focusedItemIndex, this.queueScrollToIdx, this.props.flatCollection),
//       );
//       this.queueScrollToIdx = undefined;
//     }
//   }

//   onItemFocus({ index, isVisible }) {
//     if (index !== undefined && isVisible) {
//       this.focusedItemIndex = index;
//     } else if (index !== undefined && !isVisible && !this.queueScrollToIdx) {
//       this.queueScrollToIdx = index;
//     }
//   }

//   render() {
//     return (
//       <List
//         ref={(c) => {
//           this.listComponent = c;
//         }}
//         style={{ width: '100%' }}
//         height={calculateMenuListHeight({
//           maxHeight: this.props.maxHeight,
//           totalLength: this.props.flatCollection.length,
//           groupLength: this.props.children.length,
//           optionLabelHeight: this.props.optionLabelHeight,
//           groupLabelHeight: this.props.groupLabelHeight,
//         })}
//         scrollToIndex={calculateScrollIndex({
//           children: this.props.flatCollection,
//           selected: this.props.selectedValue || this.props.defaultValue,
//           valueGetter: this.props.valueGetter,
//         })}
//         rowCount={this.props.flatCollection.length || 0}
//         rowHeight={calculateGroupRowHeight({
//           children: this.props.flatCollection,
//           optionLabelHeight: this.props.optionLabelHeight,
//           groupLabelHeight: this.props.groupLabelHeight,
//         })}
//         rowRenderer={virtualizeGroupedRowRenderer({
//           children: this.props.flatCollection,
//           formatGroup: this.props.formatGroup,
//           listItemClassName: this.props.listItemClassName,
//           onItemFocus: this.onItemFocus,
//         })}
//         // the style width 100% will override this prop, we need to set something big because it is a required field
//         width={1000}
//       />
//     );
//   }
// }

GroupMenuListVirtualized.propTypes = {
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

GroupMenuListVirtualized.defaultProps = {
  maxHeight: undefined,
  optionLabelHeight: undefined,
  selectedValue: undefined,
  defaultValue: undefined,
  valueGetter: undefined,
  listItemClassName: undefined,
  groupLabelHeight: undefined,
};

export default GroupMenuListVirtualized;
