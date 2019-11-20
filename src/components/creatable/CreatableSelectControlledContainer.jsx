import React, { memo, useCallback } from 'react';
import CreatableSelect from './CreatableSelect';
import PropTypes from 'prop-types';

import { isDifferentValueOption } from '@rsv-lib/creatable';

const CreatableSelectControlledContainer = memo(({ onChange, onCreateOption, value, options, ...props }) => {
  const onCreateOptionHandler = useCallback(
    (newItem) => {
      onCreateOption({ value: newItem, label: newItem, isNewOption: true });
    },
    [onCreateOption],
  );

  const onValueChangeHandler = useCallback((option) => {
    if (isDifferentValueOption(option, value)) {
      if (option && option.__isNew__) {
        return onCreateOptionHandler(option.value);
      }
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
});

CreatableSelectControlledContainer.displayName = 'CreatableSelectControlledContainer';

CreatableSelectControlledContainer.propTypes = {
  onCreateOption: PropTypes.func,
};

CreatableSelectControlledContainer.defaultProps = {
  onCreateOption: undefined,
};

export default CreatableSelectControlledContainer;
