import React, { forwardRef, memo, Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { Async as ReactAsync } from 'react-select';
import { calculateDebounce } from './helpers/fast-react-select';

const LAG_INDICATOR = 1000;

const loadingMessage = () => <div>...</div>;

let SpeedReactSelect = (props, ref) => {
  let timer;

  const debounceTime = useMemo(() => props.onCalculateFilterDebounce(props.options.length), [props.options.length]);

  // avoid deestructur to best performance
  const memoOptions = useMemo(
    () =>
      props.options.map((item) => ({
        label: item.label,
        value: item.value,
        lowercaseLabel: item.label.toLowerCase(),
      })),
    [props.options],
  );

  let inputValLowercase;
  const loadOptions = (inputValue, callback) => {
    // debounce the filter since it is going to be an expensive operation
    if (timer) {
      clearTimeout(timer);
    }
    inputValLowercase = inputValue.toLowerCase();

    if (props.minimumInputSearch > inputValLowercase.length) {
      // todo implement
    }

    timer = setTimeout(() => {
      if (!inputValue) {
        callback(props.options);
      }
      // don't destructure here is too expensive
      return callback(memoOptions.filter((item) => item.lowercaseLabel.includes(inputValLowercase)));
    }, debounceTime);
  };

  if (memoOptions.length >= 15000) {
    console.warn(
      `for more than 15000 element you will have to limit the minimum input characters to search in the array, since react-select cache everything and he can't handle so much data to validate with. Use the prop minimumInputSearch to at least 2 to have an smooth experience. If you want this message to disappear force the minimumInputSearch to 1(default).
      `,
    );
  }

  return (
    <Fragment>
      {memoOptions.length <= LAG_INDICATOR && <ReactSelect ref={ref} {...props} />}
      {memoOptions.length > LAG_INDICATOR && (
        <ReactAsync
          ref={ref}
          {...props}
          loadingMessage={props.loadingMessage || loadingMessage}
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions={props.minimumInputSearch > 1 ? undefined : memoOptions}
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
  minimumInputSearch: PropTypes.number,
};

SpeedReactSelect.defaultProps = {
  onCalculateFilterDebounce: calculateDebounce,
  minimumInputSearch: 1,
};

export default SpeedReactSelect;
