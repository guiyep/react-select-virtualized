// this is very basic analize a bit more
// TOTO calculate computation time O(n) to know exactly the debounce we need
export const calculateDebounce = (size) => {
  if (size < 4000) {
    return 100;
  }
  if (size < 8000) {
    return 200;
  }
  return size / 50;
};

export const filterByLowercaseLabel = (list, value) => list.filter((item) => item.lowercaseLabel.includes(value));

export const defaultFormatOptionLabel = (item) => item.label;

export const mapLowercaseLabel = (list, formatOptionLabel = defaultFormatOptionLabel, iterator = () => ({})) =>
  list.map((item) => ({
    lowercaseLabel: formatOptionLabel(item, {}).toLowerCase(),
    ...item,
    ...iterator(item),
  }));
