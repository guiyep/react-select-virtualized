import React, { forwardRef, memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { Async as ReactAsync } from 'react-select';

const LAG_INDICATOR = 1000;

const loadingMessage = () => <div>...</div>;

let SpeedReactSelect = (props, ref) => {
  let timer;
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
    }, 100);
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
  options: PropTypes.array.isRequired,
};

export default SpeedReactSelect;
