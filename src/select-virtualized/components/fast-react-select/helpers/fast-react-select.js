// this is very basic analize a bit more
export const calculateDebounce = (size) => {
  if (size < 4000) {
    return 100;
  }
  if (size < 8000) {
    return 200;
  }
  return size / 100;
};
