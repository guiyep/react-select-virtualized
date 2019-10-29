import React, { memo, useCallback, useEffect } from 'react';
import Select from '../select/Select';
import PropTypes from 'prop-types';

const CreatableSelect = memo(({ onValueChange, onOptionsChange, onNewOption, ...props }) => {
  const { options, value } = props;

  useEffect(() => {
    if (options) {
      onOptionsChange(options);
    }
  }, [options, onOptionsChange]);

  useEffect(() => {
    onValueChange(value);
  }, [value, onValueChange]);

  return <Select {...props} onCreateOption={onNewOption} onChange={onValueChange} creatable />;
});

CreatableSelect.displayName = 'CreatableSelect';

CreatableSelect.propTypes = {
  onValueChange: PropTypes.func,
  onOptionsChange: PropTypes.func,
  onNewOption: PropTypes.func,
};

CreatableSelect.defaultProps = {
  onValueChange: () => {},
  onOptionsChange: () => {},
  onNewOption: () => {},
};

export default CreatableSelect;
