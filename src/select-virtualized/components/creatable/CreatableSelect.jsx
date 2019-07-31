import React, { memo } from 'react';
import Select from '../select/Select';
import PropTypes from 'prop-types';

const CreatableSelect = memo(({ onChange, ...props }) => {
  return <Select {...props} onChange={onChange} creatable />;
});

CreatableSelect.displayName = 'CreatableSelect';

CreatableSelect.propTypes = {
  onChange: PropTypes.func,
};

CreatableSelect.defaultProps = {
  onChange: () => {},
};

export default CreatableSelect;
