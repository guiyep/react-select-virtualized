export const isGroupHeader = ({ typeGroup }) => !!typeGroup;

export const getGroupRowHeight = ({ children, optionHeight, groupHeaderHeight }) => ({ index }) => {
  const currentProps = children[index].props;
  return isGroupHeader(currentProps) ? groupHeaderHeight : optionHeight;
};
