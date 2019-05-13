import React, { forwardRef, memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import { optionsPropTypes } from './helpers/prop-types';

const Async = memo(({ defaultOptions, loadOptions, ...props }) => {
  let internalOptions;

  const options = useMemo(() => defaultOptions || [], [defaultOptions]);

  const asyncLoadOptions = useCallback((inputValue) => {
    return new Promise((resolve) => {
      if (!internalOptions) {
        internalOptions = [...options];
      }
      loadOptions(inputValue, (result) => {
        internalOptions = internalOptions.concat(result);
        resolve(internalOptions);
      });
    });
  });

  return <Select {...props} options={options} asyncLoadOptions={asyncLoadOptions} />;
});

Async.displayName = 'Async';

Async.propTypes = {
  defaultOptions: optionsPropTypes.isRequired,
  loadOptions: PropTypes.func.isRequired,
};

export default Async;
