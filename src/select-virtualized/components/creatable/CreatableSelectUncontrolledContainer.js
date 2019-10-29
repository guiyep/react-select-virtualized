import React, { memo, useCallback, useReducer } from 'react';
import CreatableSelect from './CreatableSelect';

import { isDifferentValueOption } from './lib/helpers';
import reducer, { SET_VALUE, SET_OPTIONS } from './state-reducer';

const CreatableSelectUncontrolledContainer = memo(({ defaultValue, value, options, ...props }) => {
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
    [state],
  );

  const onOptionsChangeHandler = useCallback((options) => {
    if (options !== state.options) {
      dispatch({ type: SET_OPTIONS, payload: options });
    }
  });

  const onValueChangeHandler = useCallback((option) => {
    if (isDifferentValueOption(option, state.value)) {
      if (option && option.__isNew__) {
        return onNewOptionHandler(option.value);
      }
      return dispatch({ type: SET_VALUE, payload: option });
    }
  });

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
