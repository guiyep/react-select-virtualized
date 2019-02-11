import React, { memo, Fragment } from 'react';
import ReactHoverObserver from 'react-hover-observer';
import classnames from 'classnames';

const FastLabel = memo(({ data, setValue, isHovering }) => {
  const onClickHandler = () => setValue(data);

  return (
    <div className={classnames({ 'flat-virtualized-item-focused': isHovering })} onClick={onClickHandler}>
      {data.label}
    </div>
  );
});

const FastOption = memo(({ data, isScrolling, isVisible, setValue }) => (
  <Fragment>
    {(isScrolling || !isVisible) && <FastLabel data={data} setValue={setValue} isHovering={false} />}
    {!isScrolling && isVisible && (
      <ReactHoverObserver>
        {({ isHovering }) => <FastLabel data={data} setValue={setValue} isHovering={isHovering} />}
      </ReactHoverObserver>
    )}
  </Fragment>
));

export default FastOption;
