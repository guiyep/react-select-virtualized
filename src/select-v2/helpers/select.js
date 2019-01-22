import { GroupVirtualizedListBuilder } from '../components/grouped-virtualized-list';
import { FlatVirtualizedListBuilder } from '../components/flat-virtualized-list';

const offset = 4;

export const menuListItemHeight = 40;

export const getListHeight = ({
  maxHeight = 0,
  totalLength = 0,
  groupLength = 0,
  optionHeight = 1,
  groupHeaderHeight = 1,
}) => {
  const getHeight = totalLength * optionHeight - groupLength * Math.abs(optionHeight - groupHeaderHeight);
  return getHeight > maxHeight ? maxHeight : getHeight;
};

export const getScrollIndex = ({ children, selected, valueGetter }) => {
  if (children && selected && valueGetter)
    return children.findIndex(
      (child) => (valueGetter(child) || valueGetter(child.props.data)) === valueGetter(selected),
    );
  return undefined;
};

export const getNextRowIndex = (prevFocusIndex = 0, nextIndex = 0, options = []) => {
  const goingDown = prevFocusIndex < nextIndex;
  const toRow = nextIndex + (goingDown ? offset : -offset);
  const listSize = options.length;
  const nextOffsetItem = toRow < listSize ? toRow : listSize;
  const prevOffsetItem = toRow > 0 ? toRow : 0;
  return goingDown ? nextOffsetItem : prevOffsetItem;
};

export const buildListComponents = (props) => {
  const components = {};
  if (props.virtualizeList) {
    components.MenuList = props.formatGroupHeaderLabel
      ? GroupVirtualizedListBuilder({
          formatGroupHeader: props.formatGroupHeaderLabel,
          groupHeaderHeight: props.groupHeaderHeight,
          optionHeight: props.optionHeight,
          defaultValue: props.defaultValue,
        })
      : FlatVirtualizedListBuilder({
          optionHeight: props.optionHeight,
          defaultValue: props.defaultValue,
        });
  }
  return components;
};

export const getStyles = (props) => {
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
