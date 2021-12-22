import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FastHover } from '../fast-hover';
import { FastLabel } from '../fast-label';

const FastOption = memo(
  ({ data, isScrolling, isSelected, isVisible, setValue, optionHeight, isFocused, formatOptionLabel }) => (
    <>
      {(isScrolling || !isVisible || isFocused) && (
        <FastLabel
          data={data}
          setValue={setValue}
          isHovering={false}
          isSelected={isSelected}
          isFocused={isFocused}
          style={{ lineHeight: `${optionHeight}px` }}
          formatOptionLabel={formatOptionLabel}
        />
      )}
      {!isScrolling && isVisible && !isFocused && (
        <FastHover>
          {({ isHovering }) => (
            <FastLabel
              data={data}
              setValue={setValue}
              isHovering={isHovering}
              isSelected={isSelected}
              style={{ lineHeight: `${optionHeight}px` }}
              formatOptionLabel={formatOptionLabel}
            />
          )}
        </FastHover>
      )}
    </>
  ),
);

FastOption.propTypes = {
  data: PropTypes.object.isRequired,
  isScrolling: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
  optionHeight: PropTypes.number.isRequired,
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
  formatOptionLabel: PropTypes.func,
};

export default FastOption;
