import React, { forwardRef, memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import { optionsPropTypes } from './helpers/prop-types';

const Async = memo(({ defaultOptions, loadOptions, cacheOptions, onInputChange, ...props }) => {
  const options = useMemo(() => defaultOptions || [], [defaultOptions]);

  const asyncLoadOptions = useCallback((inputValue) => {
    return new Promise((resolve) => {
      loadOptions(inputValue, (result) => {
        resolve(result);
      });
    });
  });

  return <Select {...props} options={options} asyncInputChange={onInputChange} asyncLoadOptions={asyncLoadOptions} />;
});

Async.displayName = 'Async';

Async.propTypes = {
  defaultOptions: optionsPropTypes,
  loadOptions: PropTypes.func.isRequired,
  onInputChange: PropTypes.func,
  cacheOptions: PropTypes.bool,
};

Async.defaultProps = {
  defaultOptions: [],
  onInputChange: undefined,
  cacheOptions: true,
};

export default Async;
