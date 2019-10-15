import React, { memo, useCallback, useReducer } from 'react';
import CreatableSelect from './CreatableSelect';
import PropTypes from 'prop-types';

import reducer, { SET_VALUE, SET_OPTIONS } from './state-reducer';

const CreatableSelectContainer = memo(({ onChange, onCreateOption, value, defaultValue, options, ...props }) => {
  // render a controlled component
  if (value !== undefined) {
    const onCreateOptionHandler = useCallback(
      (newItem) => {
        onCreateOption({ value: newItem, label: newItem, isNewOption: true });
      },
      [onCreateOption],
    );

    const onValueChangeHandler = useCallback((option) => {
      const isDifferent =
        (option && value && option.value != value.value) || (!option && !!value) || (!!option && !value);

      if (isDifferent)
        if (option && option.__isNew__) {
          return onCreateOptionHandler(option.value);
        }
      if (isDifferent) {
        return onChange(option);
      }
    });

    return (
      <CreatableSelect
        value={value}
        onNewOption={onCreateOptionHandler}
        options={options}
        onValueChange={onValueChangeHandler}
        {...props}
      />
    );
  }

  if (onCreateOption) {
    throw new Error('creatable component cannot be used as uncontrolled with onCreateOption');
  }

  // render an uncontrolled component
  const { grouped } = props;

  if (grouped) {
    throw new Error('creatable component cannot be used as uncontrolled and grouped');
  }

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
    const isDifferent =
      (option && value && option.value != value.value) || (!option && !!value) || (!!option && !value);

    if (isDifferent) {
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

CreatableSelectContainer.displayName = 'CreatableSelectContainer';

CreatableSelectContainer.propTypes = {
  onCreateOption: PropTypes.func,
};

CreatableSelectContainer.defaultProps = {
  onCreateOption: undefined,
};

export default CreatableSelectContainer;
