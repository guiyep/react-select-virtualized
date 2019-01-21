import { GroupVirtualizedListBuilder } from '../components/grouped-virtualized-list';
import { FlatVirtualizedListBuilder } from '../components/flat-virtualized-list';

const offset = 4;

export const menuListItemHeight = 40;

export const getListHeight = ({
  maxHeight = 0,
  totalLength = 0,
  groupLength = 0,
  optionLabelHeight = 1,
  groupLabelHeight = 1,
}) => {
  const getHeight = totalLength * optionLabelHeight - groupLength * Math.abs(optionLabelHeight - groupLabelHeight);
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

export const buildCustomizableComponents = (props) => {
  const components = {};
  if (props.virtualizeList) {
    components.MenuList = props.formatGroupLabel
      ? GroupVirtualizedListBuilder({
          formatGroupLabel: props.formatGroupLabel,
          groupLabelHeight: props.groupLabelHeight,
          optionLabelHeight: props.optionLabelHeight,
          defaultValue: props.defaultValue,
          valueGetter: props.getOptionValue,
          listItemClassName: props.listItemClassName,
        })
      : FlatVirtualizedListBuilder({
          optionLabelHeight: props.optionLabelHeight,
          defaultValue: props.defaultValue,
          valueGetter: props.getOptionValue,
          listItemClassName: props.listItemClassName,
        });
  }
  // if (props.disableInputOnSelection) {
  //   components.Input = InputBuilder();
  // }
  return components;
};

export const buildCustomStyles = (props) => {
  const defaultStyles = {
    clearIndicator: (provided) => ({
      ...provided,
      ':hover': {
        cursor: 'pointer',
        color: '#f22',
      },
    }),
  };

  return props.disableInputOnSelection
    ? {
        ...defaultStyles,
        dropdownIndicator: () => ({
          display: 'none',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
      }
    : defaultStyles;
};
