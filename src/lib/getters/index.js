import { offset } from '../defaults';

export const getListHeight = ({
  maxHeight = 0,
  totalSize = 0,
  groupSize = 0,
  optionHeight = 1,
  groupHeaderHeight = 1,
}) => Math.min(maxHeight, totalSize * optionHeight - groupSize * Math.abs(optionHeight - groupHeaderHeight));

export const getScrollIndex = ({ children, selected, valueGetter }) => {
  if (children && selected && valueGetter)
    return children.findIndex((child) => {
      // tru getting the value from the children
      let value = valueGetter(child);
      const selectedValue = valueGetter(selected);
      if (value !== undefined && value === selectedValue) {
        return true;
      }
      // try getting the item from the data otherwise
      value = child.props && valueGetter(child.props.data);
      if (value !== undefined && value === selectedValue) {
        return true;
      }
      return false;
    });
  return undefined;
};

export const getNextRowIndex = (prevFocusIndex = 0, nextIndex = 0, options = []) => {
  const goingDown = prevFocusIndex < nextIndex;
  const toRow = nextIndex + ((goingDown && offset) || -offset);
  const listSize = options.length;
  const nextOffsetItem = toRow < listSize ? toRow : listSize;
  const prevOffsetItem = toRow > 0 ? toRow : 0;
  return goingDown ? nextOffsetItem : prevOffsetItem;
};

export const isGroupHeader = ({ typeGroup }) => !!typeGroup;

export const getGroupRowHeight =
  ({ children, optionHeight, groupHeaderHeight }) =>
  ({ index }) => {
    const thisProps = children[index].props || {};
    return isGroupHeader(thisProps) ? groupHeaderHeight : optionHeight;
  };
