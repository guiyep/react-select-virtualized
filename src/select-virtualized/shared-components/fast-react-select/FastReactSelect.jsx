import React, { forwardRef, memo, Fragment, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import ReactAsync from 'react-select/async';
import { calculateDebounce, mapLowercaseLabel, getFilteredItems } from './helpers/fast-react-select';
import { calculateTotalListSize } from '../grouped-virtualized-list/helpers/grouped-list';
import { optionsPropTypes } from '../../shared-helpers/prop-types';
import { useDebouncedCallback } from '../../hooks/use-debaunced-callback';

const LAG_INDICATOR = 1000;

const loadingMessage = () => <div>...</div>;

let FastReactSelect = (props, ref) => {
  const {
    asyncLoadOptions,
    asyncInputChange,
    minimumInputSearch,
    options,
    formatOptionLabel,
    grouped,
    filterOption,
  } = props;

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
  // TODO improve this
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
        return asyncLoadOptions(inputValue).then((newList) => {
          callback(newList);
        });
      }
      return callback(getFilteredItems({ inputValue, memoOptions, grouped, filterOption }));
    },
    debounceTime,
    [minimumInputSearchIsSet, menuIsOpenState, asyncLoadOptions, debounceTime, grouped, memoOptions],
  );

  return (
    <Fragment>
      {listSize <= LAG_INDICATOR && !minimumInputSearchIsSet && !asyncLoadOptions && (
        <ReactSelect ref={ref} {...props} captureMenuScroll={false} />
      )}
      {(listSize > LAG_INDICATOR || minimumInputSearchIsSet || !!asyncLoadOptions) && (
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
  minimumInputSearch: 0,
  asyncLoadOptions: undefined,
  asyncInputChange: () => {},
};

export default FastReactSelect;
