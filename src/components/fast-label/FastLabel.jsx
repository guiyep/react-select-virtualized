import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

const configFastLabelOption = {
  context: 'menu',
};

const FastLabel = memo(({ data, selectOption, isHovering, isSelected, isFocused, style, formatOptionLabel }) => {
  const onClickHandler = () => selectOption(data);

  const label = useMemo(() => (formatOptionLabel ? formatOptionLabel(data, configFastLabelOption) : data.label), [
    data,
    formatOptionLabel,
  ]);

  return (
    <div
      className={`${
        isSelected ? 'fast-option-selected' : isHovering || isFocused ? 'fast-option-focused' : ''
      } fast-option ${data.__isNew__ ? 'fast-option-create' : ''}`}
      style={style}
      onClick={onClickHandler}
    >
      {label}
    </div>
  );
});

FastLabel.propTypes = {
  data: PropTypes.object.isRequired,
  selectOption: PropTypes.func,
  isHovering: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  style: PropTypes.object,
  formatOptionLabel: PropTypes.func,
};

FastLabel.defaultProps = {
  selectOption: undefined,
  style: undefined,
  formatOptionLabel: undefined,
};

FastLabel.displayName = 'FastLabel';

export default FastLabel;
