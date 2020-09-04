import { buildErrorText } from '@rsv-lib/error';

// this is very basic analize a bit more
export const calculateDebounce = (size) => {
  if (size <= 30000) {
    return (size + 100) * 0.001; // approx 0.001 ms per action, calculate 100 extra actions. this is a constant value. pefromance degradation starts after 30000 elements
  }
  return (size + 100) * 0.005; // increase the action time so we have a buffer.
};

// we have to go as low level as possible. so we get the best performance here. this is the most expensive operation
export const filterByLowercaseLabel = (list, value, filterOption) => {
  const result = [];
  const size = list.length;

  if (typeof filterOption === 'function') {
    for (var i = 0; i < size; i++) {
      if (filterOption(list[i], value)) {
        result.push(list[i]);
      }
    }
    return result;
  }

  for (var i = 0; i < size; i++) {
    if (list[i].lowercaseLabel.indexOf(value) >= 0) {
      result.push(list[i]);
    }
  }
  return result;
};

export const defaultFormatOptionLabel = (item) => item && item.label;

export const mapLowercaseLabel = (list, formatOptionLabel = defaultFormatOptionLabel, iterator = () => ({})) =>
  list.map((item) => {
    let label = formatOptionLabel(item, {});

    // this is not a plain text
    if (typeof label !== 'string') {
      label = defaultFormatOptionLabel(item);
    }

    if (label === undefined || label === null) {
      throw new Error(
        buildErrorText(
          'For performance reasons, if formatOptionLabel returns something different from text, the label element must be in the option. The label to display cannot be undefined or null.',
        ),
      );
    }

    return { lowercaseLabel: label.toLowerCase(), ...item, ...iterator(item) };
  });

//todo improve this
export const filterGroupedElementsBy = (list, inputValLowercase, filterBy, filterOption) => {
  return list.reduce((acc, item) => {
    acc.push({
      ...item,
      options: filterBy(item.options, inputValLowercase, filterOption),
    });
    return acc;
  }, []);
};

export const getFilteredItems = ({ inputValue, memoOptions, grouped, filterOption }) => {
  const inputValLowercase = inputValue && inputValue.toLowerCase();
  if (!inputValue) {
    return memoOptions;
  }
  if (grouped) {
    return filterGroupedElementsBy(memoOptions, inputValLowercase, filterByLowercaseLabel, filterOption);
  }
  return filterByLowercaseLabel(memoOptions, inputValLowercase, filterOption);
};

export const flattenGroupedOptions = (reactComponent) =>
  (reactComponent && reactComponent.length ? reactComponent : [])
    .map((child) => [
      {
        props: {
          typeGroup: 'group',
          label: child.props.data.label,
          options: child.props.options,
          config: child.props.data.config
        },
      },
      ...child.props.children,
    ])
    .reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

// 1 is for the group item
export const calculateTotalGroupedListSize = (options) => options.reduce((acc, item) => acc + 1 + item.options.length, 0);

export const isDifferentValueOption = (op, val) =>
  (op && val && op.value != val.value) || (!op && !!val) || (!!op && !val);
