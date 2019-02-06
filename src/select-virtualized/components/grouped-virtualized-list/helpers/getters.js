export const isGroupHeader = ({ typeGroup }) => !!typeGroup;

export const getGroupRowHeight = ({ children, optionHeight, groupHeaderHeight }) => ({ index }) => {
  const thisProps = children[index].props;
  return isGroupHeader(thisProps) ? groupHeaderHeight : optionHeight;
};
