// this is very basic analize a bit more
export const calculateDebounce = (size) => {
  if (size <= 30000) {
    return (size + 100) * 0.001; // approx 0.001 ms per action, calculate 100 extra actions. this is a constant value. pefromance degradation starts after 30000 elements
  }
  return 300;
};

export const filterByLowercaseLabel = (list, value) => list.filter((item) => item.lowercaseLabel.includes(value));

export const defaultFormatOptionLabel = (item) => item.label;

export const mapLowercaseLabel = (list, formatOptionLabel = defaultFormatOptionLabel, iterator = () => ({})) =>
  list.map((item) => ({
    lowercaseLabel: formatOptionLabel(item, {}).toLowerCase(),
    ...item,
    ...iterator(item),
  }));
