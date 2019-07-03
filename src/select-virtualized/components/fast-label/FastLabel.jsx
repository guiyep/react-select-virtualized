import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const configFastLabelOption = {
  context: 'menu',
};

const FastLabel = memo(({ data, setValue, isHovering, isFocused, style, formatOptionLabel }) => {
  const onClickHandler = () => setValue(data);

  const label = useMemo(() => (formatOptionLabel ? formatOptionLabel(data, configFastLabelOption) : data.label), [
    data,
    formatOptionLabel,
  ]);

  return (
    <div
      className={classnames(
        { 'fast-option-focused': isHovering || isFocused },
        'fast-option',
        data.__isNew__ ? 'fast-option-create' : undefined,
      )}
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
  isFocused: PropTypes.bool.isRequired,
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
