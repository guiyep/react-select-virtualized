import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from '../select/Select';

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
  options: PropTypes.object,
  value: PropTypes.any,
};

CreatableSelect.defaultProps = {
  onValueChange: () => {},
  onOptionsChange: () => {},
  onNewOption: () => {},
};

export default CreatableSelect;
