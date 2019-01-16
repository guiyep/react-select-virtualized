import { List } from 'react-virtualized';
import React from 'react';
import PropTypes from 'prop-types';
import { calculateMenuListHeight, calculateScrollIndex, calculateNextRowIndex } from '../helpers/select-helpers';
import { virtualizeRowRenderer } from '../helpers/select-list-helper';

class MenuListVirtualized extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onItemFocus = this.onItemFocus.bind(this);
    // queue any update on the focus position so we can update the scroll to that value if it is not visible.
    this.queueScrollToIdx = undefined;
    // save the last focused item. We use this value to know the the scroll is going down or up
    this.focusedItemIndex = undefined;
  }

  componentDidUpdate() {
    // only scroll to index when we have something in the queue of focused and not visible
    if (this.listComponent && this.queueScrollToIdx) {
      this.listComponent.scrollToRow(
        calculateNextRowIndex(this.focusedItemIndex, this.queueScrollToIdx, this.props.options),
      );
      this.queueScrollToIdx = undefined;
    }
  }

  onItemFocus({ index, isVisible }) {
    if (index !== undefined && isVisible) {
      this.focusedItemIndex = index;
    } else if (index !== undefined && !isVisible && !this.queueScrollToIdx) {
      this.queueScrollToIdx = index;
    }
  }

  render() {
    return (
      <List
        ref={(c) => {
          this.listComponent = c;
        }}
        style={{ width: '100%' }}
        height={calculateMenuListHeight({
          maxHeight: this.props.maxHeight,
          totalLength: this.props.children.length,
          optionLabelHeight: this.props.optionLabelHeight,
        })}
        scrollToIndex={calculateScrollIndex({
          children: this.props.options,
          selected: this.props.selectedValue || this.props.defaultValue,
          valueGetter: this.props.valueGetter,
        })}
        rowCount={this.props.children.length || 0}
        rowHeight={this.props.optionLabelHeight}
        rowRenderer={virtualizeRowRenderer({
          ...this.props,
          onItemFocus: this.onItemFocus,
        })}
        // the style width 100% will override this prop, we need to set something big because it is a required field
        width={1000}
      />
    );
  }
}

MenuListVirtualized.propTypes = {
  maxHeight: PropTypes.number,
  children: PropTypes.node.isRequired,
  optionLabelHeight: PropTypes.number,
  selectedValue: PropTypes.object,
  defaultValue: PropTypes.object,
  valueGetter: PropTypes.func,
  listItemClassName: PropTypes.string,
  options: PropTypes.array.isRequired,
};

MenuListVirtualized.defaultProps = {
  maxHeight: undefined,
  optionLabelHeight: undefined,
  selectedValue: undefined,
  defaultValue: undefined,
  valueGetter: undefined,
  listItemClassName: undefined,
};

export default MenuListVirtualized;
