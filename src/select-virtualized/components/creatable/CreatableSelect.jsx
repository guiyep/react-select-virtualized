import React, { memo, useCallback, useState, useEffect } from 'react';
import Select from '../select/Select';
import PropTypes from 'prop-types';

const CreatableSelect = memo(({ onChange, onCreateOption, ...props }) => {
  const { options, grouped, value, defaultValue } = props;
  const [optionsState, setOptionsState] = useState(options);
  const [valueState, setValueState] = useState(value || defaultValue);

  const onCreateOptionHandler = useCallback(
    (newItem) => {
      const newItemObj = { value: newItem, label: newItem, __isNew__: true };
      if (!onCreateOption && !grouped) {
        setOptionsState(optionsState.concat([newItemObj]));
        setValueState(newItemObj);
      }
    },
    [grouped, optionsState, onCreateOption],
  );

  const onChangeHandler = useCallback(() => {
    
  })

  useEffect(() => {
    if (options) {
      setOptionsState(options);
    }
  }, [options]);

  useEffect(() => {
    setValueState(value);
  }, [value]);

  return (
    <Select
      {...props}
      value={valueState}
      options={optionsState}
      onCreateOption={onCreateOptionHandler}
      onChange={onChange}
      creatable
    />
  );
});

CreatableSelect.displayName = 'CreatableSelect';

CreatableSelect.propTypes = {
  onCreateOption: PropTypes.func,
  onChange: PropTypes.func,
};

CreatableSelect.defaultProps = {
  onCreateOption: undefined,
  onChange: () => {},
};

export default CreatableSelect;
