import React, { memo, useMemo } from 'react';
import ReactHoverObserver from 'react-hover-observer';
import classnames from 'classnames';

const FastLabel = memo(({ data, isScrolling, setValue, isHovering, isVisible }) => {
  const cssName = useMemo(
    () => classnames({ 'flat-virtualized-item-focused': isHovering && !isScrolling && isVisible }),
    [isHovering, isScrolling, isVisible],
  );

  const onClickHandler = useMemo(() => () => setValue(data), [data]);

  return (
    <div className={cssName} onClick={onClickHandler}>
      {data.label}
    </div>
  );
});

const FastOption = memo(({ data, isScrolling, isVisible, setValue }) => (
  <ReactHoverObserver>
    {({ isHovering }) => (
      <FastLabel
        data={data}
        setValue={setValue}
        isHovering={isHovering}
        isScrolling={isScrolling}
        isVisible={isVisible}
      />
    )}
  </ReactHoverObserver>
));

export default FastOption;
