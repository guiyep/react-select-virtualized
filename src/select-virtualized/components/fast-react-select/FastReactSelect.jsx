import React, { forwardRef, memo, Fragment, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { Async as ReactAsync } from 'react-select';
import { calculateDebounce, filterByLowercaseLabel, mapLowercaseLabel } from './helpers/fast-react-select';
import { calculateTotalListSize } from '../grouped-virtualized-list/helpers/grouped-list';
import { optionsPropTypes } from '../../helpers/prop-types';

const LAG_INDICATOR = 1000;

const loadingMessage = () => <div>...</div>;

let FastReactSelect = (props, ref) => {
  let timer;
  const minimumInputSearchIsSet = props.minimumInputSearch > 1;

  const listSize = useMemo(() => (props.grouped && calculateTotalListSize(props.options)) || props.options.length, [
    props.options.length,
  ]);
  const debounceTime = useMemo(() => props.onCalculateFilterDebounce(listSize), [listSize]);
  const [menuIsOpenState, setMenuIsOpen] = (!minimumInputSearchIsSet && []) || useState({ currentInput: '' });

  const updateSetMenuIsOpen = useCallback((inputValue, state) => {
    if (minimumInputSearchIsSet) {
      setMenuIsOpen({
        ...menuIsOpenState,
        currentInput: inputValue,
        [inputValue || '']: state,
      });
    }
  });

  // avoid destructuring to best performance
  // TODO improve this
  const memoOptions = useMemo(
    () => {
      return mapLowercaseLabel(props.options, props.formatOptionLabel, (itemOption) => {
        if (itemOption.options && props.grouped) {
          return {
            options: mapLowercaseLabel(itemOption.options, props.formatOptionLabel),
          };
        }
        return {};
      });
    },
    [props.options],
  );

  const onInputChange = useCallback((inputValue) => {
    if (minimumInputSearchIsSet) {
      const inputValLowercase = (inputValue && inputValue.toLowerCase()) || '';
      updateSetMenuIsOpen(inputValLowercase, props.minimumInputSearch <= inputValLowercase.length);
    }
  });

  // debounce the filter since it is going to be an expensive operation
  const loadOptions = useCallback((inputValue, callback) => {
    if (timer) {
      clearTimeout(timer);
    }

    if (minimumInputSearchIsSet && !menuIsOpenState[menuIsOpenState.currentInput]) {
      return callback(undefined);
    }

    const inputValLowercase = inputValue && inputValue.toLowerCase();
    timer = setTimeout(() => {
      if (!inputValue) {
        callback(memoOptions);
      }
      if (props.grouped) {
        // don't destructuring obj here is too expensive
        callback(
          memoOptions.reduce((acc, item) => {
            acc.push({
              ...item,
              options: filterByLowercaseLabel(item.options, inputValLowercase),
            });
            return acc;
          }, []),
        );
      }
      // don't destructuring obj here is too expensive
      callback(filterByLowercaseLabel(memoOptions, inputValLowercase));
      return;
    }, debounceTime);
  });

  return (
    <Fragment>
      {listSize <= LAG_INDICATOR && !minimumInputSearchIsSet && <ReactSelect ref={ref} {...props} />}
      {(listSize > LAG_INDICATOR || minimumInputSearchIsSet) && (
        <ReactAsync
          ref={ref}
          {...props}
          loadingMessage={props.loadingMessage || loadingMessage}
          // this is a limitation on react-select and async, it does not work when caching options
          cacheOptions={!props.grouped}
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
  options: optionsPropTypes.isRequired,
  minimumInputSearch: PropTypes.number,
};

FastReactSelect.defaultProps = {
  onCalculateFilterDebounce: calculateDebounce,
  minimumInputSearch: 1,
};

export default FastReactSelect;
