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
              // wait for https://github.com/JedWatson/react-select/issues/3656
              // the problem is that the always start now from the beginning and not from the last selected. so
              // the arrow functionality is lost between closing and opening again.
              // isFocused={isFocused}
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
  // isFocused: PropTypes.bool.isRequired,
};

export default FastOption;
