import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { isDifferentValueOption } from '@rsv-lib/utils';
import CreatableSelect from './CreatableSelect';

const CreatableSelectControlledContainer = memo(({ onChange, onCreateOption, value, options, ...props }) => {
  const onCreateOptionHandler = useCallback(
    (newItem) => {
      onCreateOption({ value: newItem, label: newItem, isNewOption: true });
    },
    [onCreateOption],
  );

  const onValueChangeHandler = useCallback(
    (option) => {
      if (isDifferentValueOption(option, value)) {
        if (option && option.isNew) {
          onCreateOptionHandler(option.value);
        } else {
          onChange(option);
        }
      }
    },
    [onChange, onCreateOptionHandler, value],
  );

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
  options: PropTypes.object,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

CreatableSelectControlledContainer.defaultProps = {
  onCreateOption: undefined,
};

export default CreatableSelectControlledContainer;
