import React, { memo, Fragment } from 'react';
import { FastHover } from '../fast-hover';
import PropTypes from 'prop-types';
import { FastLabel } from '../fast-label';

const FastOption = memo(
  ({ data, isScrolling, isSelected, isVisible, isDisabled, setValue, optionHeight, isFocused, formatOptionLabel }) => (
    <Fragment>
      {(isScrolling || !isVisible || isFocused || isDisabled) && (
        <FastLabel
          data={data}
          setValue={setValue}
          isHovering={false}
          isSelected={isSelected}
          isFocused={isFocused}
          isDisabled={isDisabled}
          style={{ lineHeight: `${optionHeight}px` }}
          formatOptionLabel={formatOptionLabel}
        />
      )}
      {!isScrolling && isVisible && !isFocused && !isDisabled && (
        <FastHover>
          {({ isHovering }) => (
            <FastLabel
              data={data}
              setValue={setValue}
              isHovering={isHovering}
              isSelected={isSelected}
              isDisabled={isDisabled}
              style={{ lineHeight: `${optionHeight}px` }}
              formatOptionLabel={formatOptionLabel}
            />
          )}
        </FastHover>
      )}
    </Fragment>
  ),
);

FastOption.propTypes = {
  data: PropTypes.object.isRequired,
  isScrolling: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
  optionHeight: PropTypes.number.isRequired,
};

export default FastOption;
