import { GroupVirtualizedListFactory } from '../components/grouped-virtualized-list';
import { FlatVirtualizedListFactory } from '../components/flat-virtualized-list';

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
