import React, { memo, useMemo, useCallback } from 'react';
import Select from './Select';
import PropTypes from 'prop-types';

const CreatableSelect = memo(({ onChange, ...props }) => {
  const handleChange = useCallback(() => {}, [onChange]);

  return <Select {...props} onChange={handleChange} creatable />;
});

CreatableSelect.displayName = 'CreatableSelect';

CreatableSelect.propTypes = {};

CreatableSelect.propTypes = {};

export default CreatableSelect;