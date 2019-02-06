import React from 'react';
import { components as ReactSelectComponents } from 'react-select';
import { isGroupHeader } from './getters';

export const flattenOptions = (reactComponent) =>
  (reactComponent && reactComponent.length ? reactComponent : [])
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

export const groupVirtualizedListRowRenderer = ({ children, formatGroupHeader, onOptionFocused }) => ({
  key,
  index,
  style,
  isVisible,
  isScrolling,
}) => {
  const thisProps = children[index].props;
  const isGroupHeaderValue = isGroupHeader(thisProps);

  if (thisProps.isFocused && !isGroupHeaderValue) {
    onOptionFocused({ data: thisProps.data, index, isVisible, isScrolling });
  }

  return (
    <div className="grouped-virtualized-list-item" key={key} style={style}>
      {isGroupHeaderValue ? (
        formatGroupHeader({
          label: thisProps.label,
          options: thisProps.options,
        })
      ) : (
        <ReactSelectComponents.Option
          {...thisProps}
          style={style}
          isFocused={!isScrolling && thisProps.isFocused && isVisible}
        />
      )}
    </div>
  );
};

export const defaultGroupFormat = (height) => {
  // this can be a css also
  const groupStyle = {
    color: 'grey',
    height,
    lineHeight: `${height}px`,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1em 0 1em',
  };

  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };

  return ({ label, options }) => (
    <div style={groupStyle}>
      <div>{label}</div>
      <div style={groupBadgeStyles}>{options.length}</div>
    </div>
  );
};
