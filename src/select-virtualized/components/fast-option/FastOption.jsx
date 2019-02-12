import React, { memo, Fragment } from 'react';
import ReactHoverObserver from 'react-hover-observer';
import classnames from 'classnames';

const FastLabel = memo(({ data, setValue, isHovering, style }) => {
  const onClickHandler = () => setValue(data);

  return (
    <div
      className={classnames({ 'flat-virtualized-item-focused': isHovering }, 'flat-virtualized-item-option')}
      style={style}
      onClick={onClickHandler}
    >
      {data.label}
    </div>
  );
});

const FastOption = memo(({ data, isScrolling, isVisible, setValue, optionHeight }) => (
  <Fragment>
    {(isScrolling || !isVisible) && (
      <FastLabel data={data} setValue={setValue} isHovering={false} style={{ lineHeight: `${optionHeight}px` }} />
    )}
    {!isScrolling && isVisible && (
      <ReactHoverObserver>
        {({ isHovering }) => (
          <FastLabel
            data={data}
            setValue={setValue}
            isHovering={isHovering}
            style={{ lineHeight: `${optionHeight}px` }}
          />
        )}
      </ReactHoverObserver>
    )}
  </Fragment>
));

export default FastOption;
