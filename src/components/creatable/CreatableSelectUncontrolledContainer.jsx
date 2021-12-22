import React, { memo, useCallback, useReducer } from 'react';
import { isDifferentValueOption } from '@rsv-lib/utils';
import CreatableSelect from './CreatableSelect';

import reducer, { SET_VALUE, SET_OPTIONS } from './state-reducer';

const CreatableSelectUncontrolledContainer = memo(({ onChange, defaultValue, value, options, ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    value: defaultValue,
    options,
  });

  const onNewOptionHandler = useCallback(
    (newItem) => {
      const newItemObj = { value: newItem, label: newItem, isNewOption: true };
      dispatch({ type: SET_OPTIONS, payload: state.options.concat([newItemObj]) });
      dispatch({ type: SET_VALUE, payload: newItemObj });
      return newItemObj;
    },
    [state.options, dispatch],
  );

  const onOptionsChangeHandler = useCallback(
    (changeOptions) => {
      if (changeOptions !== state.options) {
        dispatch({ type: SET_OPTIONS, payload: changeOptions });
      }
    },
    [dispatch, state.options],
  );

  const onValueChangeHandler = useCallback(
    (option) => {
      if (isDifferentValueOption(option, state.value)) {
        if (option && option.isNew) {
          onNewOptionHandler(option.value);
        } else {
          dispatch({ type: SET_VALUE, payload: option });
        }
      }
      if (onChange) {
        onChange(option);
      }
    },
    [dispatch, onNewOptionHandler, onChange, state.value],
  );

  return (
    <CreatableSelect
      {...props}
      {...state}
      onValueChange={onValueChangeHandler}
      onOptionsChange={onOptionsChangeHandler}
      onNewOption={onNewOptionHandler}
    />
  );
});

CreatableSelectUncontrolledContainer.displayName = 'CreatableSelectUncontrolledContainer';

export default CreatableSelectUncontrolledContainer;
