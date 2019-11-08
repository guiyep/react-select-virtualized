import React, { forwardRef, memo, Fragment, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import ReactAsync from 'react-select/async';
import ReactSelectCreatableSelect from 'react-select/creatable';
import ReactSelectAsyncCreatableSelect from 'react-select/async-creatable';
import { calculateDebounce, mapLowercaseLabel, getFilteredItems } from './helpers/fast-react-select';
import { calculateTotalListSize } from '../grouped-virtualized-list/helpers/grouped-list';
import { optionsPropTypes } from '../../shared-helpers/prop-types';
import { useDebouncedCallback } from '../../hooks/use-debaunced-callback';
import { buildErrorText } from '../../shared-helpers/error-builder';

const LAG_INDICATOR = 1000;

const loadingMessage = () => <div>...</div>;

let FastReactSelect = (propsIn, ref) => {
  const {
    asyncLoadOptions,
    asyncInputChange,
    minimumInputSearch,
    options,
    formatOptionLabel,
    grouped,
    filterOption,
    creatable,
    ...props
  } = propsIn;

  const minimumInputSearchIsSet = minimumInputSearch >= 1;

  const listSize = useMemo(() => (grouped && calculateTotalListSize(options)) || options.length, [options, grouped]);
  const debounceTime = useMemo(() => calculateDebounce(listSize), [listSize]);
  const [menuIsOpenState, setMenuIsOpen] = useState({ currentInput: '' });

  const updateSetMenuIsOpen = useCallback(
    (inputValue, state) => {
      if (minimumInputSearchIsSet) {
        setMenuIsOpen({
          ...menuIsOpenState,
          currentInput: inputValue,
          [inputValue || '']: state,
        });
      }
    },
    [minimumInputSearchIsSet, setMenuIsOpen, menuIsOpenState],
  );

  // avoid destructuring to best performance
  const memoOptions = useMemo(() => {
    return mapLowercaseLabel(options, formatOptionLabel, (itemOption) => {
      if (itemOption.options && grouped) {
        return {
          options: mapLowercaseLabel(itemOption.options, formatOptionLabel),
        };
      }
      return {};
    });
  }, [options, formatOptionLabel, grouped]);

  const onInputChange = useCallback(
    (inputValue) => {
      if (minimumInputSearchIsSet) {
        const inputValLowercase = (inputValue && inputValue.toLowerCase()) || '';
        updateSetMenuIsOpen(inputValLowercase, minimumInputSearch <= inputValLowercase.length);
      }
      asyncInputChange(inputValue);
    },
    [asyncInputChange, updateSetMenuIsOpen, minimumInputSearchIsSet, minimumInputSearch],
  );

  // debounce the filter since it is going to be an expensive operation
  const loadOptions = useDebouncedCallback(
    (inputValue, callback) => {
      if (minimumInputSearchIsSet && !menuIsOpenState[menuIsOpenState.currentInput]) {
        return callback(undefined);
      }
      if (!!asyncLoadOptions) {
        // create an async function that will resolve the callback
        const asyncLoad = async () => {
          const newList = await asyncLoadOptions(inputValue);
          callback(newList);
        };

        return asyncLoad();
      }
      return callback(getFilteredItems({ inputValue, memoOptions, grouped, filterOption }));
    },
    debounceTime,
    [minimumInputSearchIsSet, menuIsOpenState, asyncLoadOptions, debounceTime, grouped, memoOptions],
  );

  if (creatable && listSize <= LAG_INDICATOR) {
    return <ReactSelectCreatableSelect ref={ref} {...props} options={memoOptions} captureMenuScroll={false} />;
  }

  if (creatable && listSize > LAG_INDICATOR) {
    return (
      <ReactSelectAsyncCreatableSelect
        ref={ref}
        {...props}
        loadingMessage={loadingMessage}
        // this is a limitation on react-select and async, it does not work when caching options
        cacheOptions={!grouped}
        loadOptions={loadOptions}
        defaultOptions={minimumInputSearch >= 1 || memoOptions.length === 0 ? true : memoOptions}
        menuIsOpen={minimumInputSearchIsSet ? !!menuIsOpenState[menuIsOpenState.currentInput] : undefined}
        onInputChange={onInputChange}
        captureMenuScroll={false}
      />
    );
  }

  if (!creatable && listSize <= LAG_INDICATOR && !minimumInputSearchIsSet && !asyncLoadOptions) {
    return (
      <ReactSelect ref={ref} {...props} filterOption={filterOption} options={memoOptions} captureMenuScroll={false} />
    );
  }

  if (listSize > LAG_INDICATOR || minimumInputSearchIsSet || !!asyncLoadOptions) {
    return (
      <ReactAsync
        ref={ref}
        {...props}
        loadingMessage={loadingMessage}
        // this is a limitation on react-select and async, it does not work when caching options
        cacheOptions={!grouped}
        loadOptions={loadOptions}
        defaultOptions={minimumInputSearch >= 1 || memoOptions.length === 0 ? true : memoOptions}
        menuIsOpen={minimumInputSearchIsSet ? !!menuIsOpenState[menuIsOpenState.currentInput] : undefined}
        onInputChange={onInputChange}
        captureMenuScroll={false}
      />
    );
  }

  throw new Error(buildErrorText('Nothing to render, something is wrong in FastReactSelect component'));
};

FastReactSelect = forwardRef(FastReactSelect);
FastReactSelect = memo(FastReactSelect);

FastReactSelect.propTypes = {
  options: optionsPropTypes.isRequired,
  minimumInputSearch: PropTypes.number,
  asyncLoadOptions: PropTypes.func,
  asyncInputChange: PropTypes.func,
  creatable: PropTypes.bool,
};

FastReactSelect.defaultProps = {
  minimumInputSearch: 0,
  asyncLoadOptions: undefined,
  asyncInputChange: () => {},
  creatable: false,
};

export default FastReactSelect;
