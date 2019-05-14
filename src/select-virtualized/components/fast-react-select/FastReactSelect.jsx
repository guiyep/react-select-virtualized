import React, { forwardRef, memo, Fragment, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { Async as ReactAsync } from 'react-select';
import { calculateDebounce, mapLowercaseLabel, getFilteredItems } from './helpers/fast-react-select';
import { calculateTotalListSize } from '../grouped-virtualized-list/helpers/grouped-list';
import { optionsPropTypes } from '../../helpers/prop-types';

const LAG_INDICATOR = 1000;

const loadingMessage = () => <div>...</div>;

let FastReactSelect = (props, ref) => {
  const minimumInputSearchIsSet = props.minimumInputSearch > 1;

  const listSize = useMemo(() => (props.grouped && calculateTotalListSize(props.options)) || props.options.length, [
    props.options.length,
  ]);
  const debounceTime = useMemo(() => calculateDebounce(listSize), [listSize]);
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
    props.asyncInputChange(inputValue);
  });

  // debounce the filter since it is going to be an expensive operation
  const loadOptions = useCallback((inputValue, callback) => {
    if (minimumInputSearchIsSet && !menuIsOpenState[menuIsOpenState.currentInput]) {
      return callback(undefined);
    }
    if (!!props.asyncLoadOptions) {
      return props.asyncLoadOptions(inputValue).then((newList) => {
        callback(newList);
      });
    }
    return setTimeout(() => {
      // if we have asnyc options the loader will be the container async component
      callback(getFilteredItems({ inputValue, memoOptions, grouped: props.grouped }));
    }, debounceTime);
  });

  return (
    <Fragment>
      {listSize <= LAG_INDICATOR && !minimumInputSearchIsSet && !props.asyncLoadOptions && (
        <ReactSelect ref={ref} {...props} />
      )}
      {(listSize > LAG_INDICATOR || minimumInputSearchIsSet || !!props.asyncLoadOptions) && (
        <ReactAsync
          ref={ref}
          {...props}
          loadingMessage={loadingMessage}
          // this is a limitation on react-select and async, it does not work when caching options
          cacheOptions={!props.grouped}
          loadOptions={loadOptions}
          defaultOptions={props.minimumInputSearch || memoOptions.length === 0 > 1 ? true : memoOptions}
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
  options: optionsPropTypes.isRequired,
  minimumInputSearch: PropTypes.number,
  asyncLoadOptions: PropTypes.func,
  asyncInputChange: PropTypes.func,
};

FastReactSelect.defaultProps = {
  minimumInputSearch: 1,
  asyncLoadOptions: undefined,
  asyncInputChange: () => {},
};

export default FastReactSelect;
