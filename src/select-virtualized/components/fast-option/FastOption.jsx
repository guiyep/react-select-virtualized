import React, { memo, Fragment, useMemo } from 'react';
import ReactHoverObserver from 'react-hover-observer';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const configFastLabelOption = {
  context: 'menu',
};

const FastLabel = memo(({ data, setValue, isHovering, isFocused, style, formatOptionLabel }) => {
  const onClickHandler = () => setValue(data);

  const label = useMemo(() => (formatOptionLabel ? formatOptionLabel(data, configFastLabelOption) : data.label), [
    data,
  ]);

  return (
    <div
      className={classnames({ 'fast-option-focused': isHovering || isFocused }, 'fast-option')}
      style={style}
      onClick={onClickHandler}
    >
      {label}
    </div>
  );
});

const FastOption = memo(({ data, isScrolling, isVisible, setValue, optionHeight, isFocused, formatOptionLabel }) => (
  <Fragment>
    {(isScrolling || !isVisible || isFocused) && (
      <FastLabel
        data={data}
        setValue={setValue}
        isHovering={false}
        isFocused={isFocused}
        style={{ lineHeight: `${optionHeight}px` }}
        formatOptionLabel={formatOptionLabel}
      />
    )}
    {!isScrolling && isVisible && !isFocused && (
      <ReactHoverObserver>
        {({ isHovering }) => (
          <FastLabel
            data={data}
            isFocused={isFocused}
            setValue={setValue}
            isHovering={isHovering}
            style={{ lineHeight: `${optionHeight}px` }}
            formatOptionLabel={formatOptionLabel}
          />
        )}
      </ReactHoverObserver>
    )}
  </Fragment>
));

FastOption.propTypes = {
  data: PropTypes.object.isRequired,
  isScrolling: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
  optionHeight: PropTypes.number.isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default FastOption;
