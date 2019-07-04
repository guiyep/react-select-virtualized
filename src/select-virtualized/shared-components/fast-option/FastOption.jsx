import React, { memo, Fragment } from 'react';
import ReactHoverObserver from 'react-hover-observer';
import PropTypes from 'prop-types';
import { FastLabel } from '../fast-label';

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
