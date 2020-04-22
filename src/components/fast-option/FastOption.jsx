import React, { memo, Fragment } from 'react';
import { FastHover } from '../fast-hover';
import PropTypes from 'prop-types';
import { FastLabel } from '../fast-label';

const FastOption = memo(
  ({ data, isScrolling, isSelected, isVisible, selectOption, optionHeight, isFocused, formatOptionLabel }) => (
    <Fragment>
      {(isScrolling || !isVisible || isFocused) && (
        <FastLabel
          data={data}
          selectOption={selectOption}
          isHovering={false}
          isFocused={isFocused}
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
              isFocused={isFocused}
              selectOption={selectOption}
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
  selectOption: PropTypes.func.isRequired,
  optionHeight: PropTypes.number.isRequired,
  // isFocused: PropTypes.bool.isRequired,
};

export default FastOption;
