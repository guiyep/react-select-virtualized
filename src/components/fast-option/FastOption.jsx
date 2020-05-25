import React, { memo, Fragment } from 'react';
import { FastHover } from '../fast-hover';
import PropTypes from 'prop-types';
import { FastLabel } from '../fast-label';

const FastOption = memo(
  ({ data, isScrolling, isSelected, isVisible, setValue, optionHeight, isFocused, formatOptionLabel }) => (
    <Fragment>
      {(isScrolling || !isVisible || isFocused) && (
        <FastLabel
          data={data}
          setValue={setValue}
          isHovering={false}
          isSelected={isSelected}
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
