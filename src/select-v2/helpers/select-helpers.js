import SelectGroupedMenuListBuilder from '../builders/GroupedListVirtualizedBuilder';
import SelectMenuListBuilder from '../builders/ListVirtualizedBuilder';
import InputBuilder from '../builders/InputBuilder';

const offset = 4;

export const menuListItemHeight = 40;

export const calculateMenuListHeight = ({
  maxHeight = 0,
  totalLength = 0,
  groupLength = 0,
  optionLabelHeight = 1,
  groupLabelHeight = 1,
}) => {
  const calculatedHeight =
    totalLength * optionLabelHeight - groupLength * Math.abs(optionLabelHeight - groupLabelHeight);
  return calculatedHeight > maxHeight ? maxHeight : calculatedHeight;
};

export const calculateScrollIndex = ({ children, selected, valueGetter }) => {
  if (children && selected && valueGetter)
    return children.findIndex(
      (child) => (valueGetter(child) || valueGetter(child.props.data)) === valueGetter(selected),
    );
  return undefined;
};

export const calculateNextRowIndex = (prevFocusIndex = 0, nextIndex = 0, options = []) => {
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
      ? SelectGroupedMenuListBuilder({
          formatGroup: props.formatGroupLabel,
          groupLabelHeight: props.groupLabelHeight,
          optionLabelHeight: props.optionLabelHeight,
          defaultValue: props.defaultValue,
          valueGetter: props.getOptionValue,
          listItemClassName: props.listItemClassName,
        })
      : SelectMenuListBuilder({
          optionLabelHeight: props.optionLabelHeight,
          defaultValue: props.defaultValue,
          valueGetter: props.getOptionValue,
          listItemClassName: props.listItemClassName,
        });
  }
  if (props.disableInputOnSelection) {
    components.Input = InputBuilder();
  }
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
