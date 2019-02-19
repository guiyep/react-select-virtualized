import React, { forwardRef, memo, Fragment, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { Async as ReactAsync } from 'react-select';
import { calculateDebounce } from './helpers/fast-react-select';
import { flattenOptions } from '../grouped-virtualized-list/helpers/grouped-list';

const LAG_INDICATOR = 1000;

const loadingMessage = () => <div>...</div>;

let FastReactSelect = (props, ref) => {
  let timer;
  const minimumInputSearchIsSet = props.minimumInputSearch > 1;
  const list = useMemo(() => (props.grouped && [...flattenOptions(props.options)]) || props.options, [props.options]);

  const debounceTime = useMemo(() => props.onCalculateFilterDebounce(list.length), [list.length]);
  const [menuIsOpenState, setMenuIsOpen] = (!props.minimumInputSearch && []) || useState({ currentInput: '' });

  const updateSetMenuIsOpen = (inputValue, state) => {
    if (minimumInputSearchIsSet) {
      setMenuIsOpen({
        ...menuIsOpenState,
        currentInput: inputValue,
        [inputValue || '']: state,
      });
    }
  };

  // avoid destructuring to best performance
  const memoOptions = useMemo(
    () =>
      list.map((item) => ({
        lowercaseLabel: item.label.toLowerCase(),
        ...item,
      })),
    [list],
  );

  const onInputChange = (inputValue) => {
    if (minimumInputSearchIsSet) {
      const inputValLowercase = (inputValue && inputValue.toLowerCase()) || '';
      updateSetMenuIsOpen(inputValLowercase, props.minimumInputSearch <= inputValLowercase.length);
    }
  };

  // debounce the filter since it is going to be an expensive operation
  const loadOptions = (inputValue, callback) => {
    if (timer) {
      clearTimeout(timer);
    }

    if (!menuIsOpenState[menuIsOpenState.currentInput]) {
      return callback(undefined);
    }

    const inputValLowercase = inputValue && inputValue.toLowerCase();
    timer = setTimeout(() => {
      if (!inputValue) {
        callback(list);
      }
      // don't destructuring obj here is too expensive // TODO filter only the subset
      callback(memoOptions.filter((item) => item.lowercaseLabel.includes(inputValLowercase)));
      return;
    }, debounceTime);
  };

  return (
    <Fragment>
      {memoOptions.length <= LAG_INDICATOR && !minimumInputSearchIsSet && <ReactSelect ref={ref} {...props} />}
      {(memoOptions.length > LAG_INDICATOR || minimumInputSearchIsSet) && (
        <ReactAsync
          ref={ref}
          {...props}
          loadingMessage={props.loadingMessage || loadingMessage}
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions={props.minimumInputSearch > 1 ? true : memoOptions}
          menuIsOpen={minimumInputSearchIsSet ? !!menuIsOpenState[menuIsOpenState.currentInput] : undefined}
          onInputChange={onInputChange}
        />
      )}
    </Fragment>
  );
};

FastReactSelect = forwardRef(FastReactSelect);
FastReactSelect = memo(FastReactSelect);

FastReactSelect.propTypes = {
  onCalculateFilterDebounce: PropTypes.func,
  options: PropTypes.array.isRequired,
  minimumInputSearch: PropTypes.number,
};

FastReactSelect.defaultProps = {
  onCalculateFilterDebounce: calculateDebounce,
  minimumInputSearch: 1,
};

export default FastReactSelect;
