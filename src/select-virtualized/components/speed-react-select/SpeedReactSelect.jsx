import React, { forwardRef, memo, Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { Async as ReactAsync } from 'react-select';

const LAG_INDICATOR = 1000;

const loadingMessage = () => <div>...</div>;

// this is very basic analize a bit more
const calculateDebounce = (size) => {
  if (size < 4000) {
    return 100;
  }
  if (size < 8000) {
    return 200;
  }
  return size / 100;
};

let SpeedReactSelect = (props, ref) => {
  let timer;

  const debounceTime = useMemo(() => props.onCalculateFilterDebounce(props.options.length), [props.options.length]);

  const loadOptions = (inputValue, callback) => {
    // debounce the filter since it is going to be an expensive operation
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if (!inputValue) {
        callback(props.options);
      }
      return callback(props.options.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase())));
    }, debounceTime);
  };

  return (
    <Fragment>
      {props.options.length <= LAG_INDICATOR && <ReactSelect ref={ref} {...props} />}
      {props.options.length > LAG_INDICATOR && (
        <ReactAsync
          ref={ref}
          {...props}
          loadingMessage={props.loadingMessage || loadingMessage}
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions={props.options}
        />
      )}
    </Fragment>
  );
};

SpeedReactSelect = forwardRef(SpeedReactSelect);
SpeedReactSelect = memo(SpeedReactSelect);

SpeedReactSelect.propTypes = {
  onCalculateFilterDebounce: PropTypes.func,
  options: PropTypes.array.isRequired,
};

SpeedReactSelect.defaultProps = {
  onCalculateFilterDebounce: calculateDebounce,
};

export default SpeedReactSelect;
