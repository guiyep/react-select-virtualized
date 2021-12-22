import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

const configFastLabelOption = {
  context: 'menu',
};

const FastLabel = memo(({ data, setValue, isHovering, isSelected, isFocused, style, formatOptionLabel }) => {
  const onClickHandler = () => setValue(data);

  const label = useMemo(
    () => (formatOptionLabel ? formatOptionLabel(data, configFastLabelOption) : data.label),
    [data, formatOptionLabel],
  );

  return (
    <div
      className={`${
        // eslint-disable-next-line
        isSelected ? 'fast-option-selected' : isHovering || isFocused ? 'fast-option-focused' : ''
      } fast-option ${data.isNew ? 'fast-option-create' : ''}`}
      style={style}
      onClick={onClickHandler}
    >
      {label}
    </div>
  );
});

FastLabel.propTypes = {
  data: PropTypes.object.isRequired,
  setValue: PropTypes.func,
  isHovering: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  style: PropTypes.object,
  formatOptionLabel: PropTypes.func,
};

FastLabel.defaultProps = {
  setValue: undefined,
  style: undefined,
  formatOptionLabel: undefined,
};

FastLabel.displayName = 'FastLabel';

export default FastLabel;
