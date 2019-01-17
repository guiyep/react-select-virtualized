import React from 'react';
import { isArray } from 'lodash';
import { components as ReactSelectComponents } from 'react-select';

export const isGroupHeader = ({ typeGroup }) => !!typeGroup;

export const calculateGroupRowHeight = ({ children, optionLabelHeight, groupLabelHeight }) => ({ index }) => {
  const currentProps = children[index].props;
  return isGroupHeader(currentProps) ? groupLabelHeight : optionLabelHeight;
};

export const flatOptionsChildren = (reactComponent) =>
  (isArray(reactComponent) ? reactComponent : [])
    .map((child) => [
      {
        props: {
          typeGroup: 'group',
          label: child.props.data.label,
          options: child.props.options,
        },
      },
      ...child.props.children,
    ])
    .reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

const Option = (props) => <ReactSelectComponents.Option {...props} />;

export const virtualizeGroupedRowRenderer = ({ children, formatGroup, listItemClassName, onItemFocus }) => ({
  key,
  index,
  style,
  isVisible,
}) => {
  const currentProps = children[index].props;
  const isGroupHeaderValue = isGroupHeader(currentProps);

  if (currentProps.isFocused && !isGroupHeaderValue) {
    onItemFocus({ data: currentProps.data, index, isVisible });
  }

  return (
    <div className={listItemClassName} key={key} style={style}>
      {isGroupHeaderValue ? (
        formatGroup({
          label: currentProps.label,
          options: currentProps.options,
        })
      ) : (
        <Option {...currentProps} />
      )}
    </div>
  );
};
