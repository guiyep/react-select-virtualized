import { GroupVirtualizedListFactory } from '../components/grouped-virtualized-list';
import { FlatVirtualizedListFactory } from '../components/flat-virtualized-list';

const offset = 4;

export const menuListItemHeight = 40;

export const getListHeight = ({
  maxHeight = 0,
  totalSize = 0,
  groupSize = 0,
  optionHeight = 1,
  groupHeaderHeight = 1,
}) => Math.min(maxHeight, totalSize * optionHeight - groupSize * Math.abs(optionHeight - groupHeaderHeight));

export const getScrollIndex = ({ children, selected, valueGetter }) => {
  if (children && selected && valueGetter)
    return children.findIndex(
      (child) => (valueGetter(child) || valueGetter(child.props.data)) === valueGetter(selected),
    );
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

export const buildListComponents = (props) => {
  const components = {};
  if (props.virtualizeList) {
    components.MenuList = props.formatGroupHeaderLabel
      ? GroupVirtualizedListFactory({
          formatGroupHeader: props.formatGroupHeaderLabel,
          groupHeaderHeight: props.groupHeaderHeight,
          optionHeight: props.optionHeight,
          defaultValue: props.defaultValue,
        })
      : FlatVirtualizedListFactory({
          optionHeight: props.optionHeight,
          defaultValue: props.defaultValue,
        });
  }
  return components;
};

export const getStyles = () => {
  return {
    clearIndicator: (provided) => ({
      ...provided,
      ':hover': {
        cursor: 'pointer',
        color: '#f22',
      },
    }),
  };
};
