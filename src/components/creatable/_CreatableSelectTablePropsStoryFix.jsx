import PropTypes from 'prop-types';
import React from 'react';

import { optionsPropTypes } from '@rsv-lib/prop-types';
import CreatableSelect from './CreatableSelect';

const Select = (props) => <CreatableSelect {...props}></CreatableSelect>;

Select.propTypes = {
  minimumInputSearch: PropTypes.number,
  options: optionsPropTypes.isRequired,
  onChange: PropTypes.func,
  grouped: PropTypes.bool, // this is only for performance enhancement so we do not need to iterate in the array many times. It is not needed if formatGroupHeaderLabel or groupHeaderHeight are defined
  formatGroupHeaderLabel: PropTypes.func,
  optionHeight: PropTypes.number,
  groupHeaderHeight: PropTypes.number,
  defaultValue: PropTypes.object,
};

Select.defaultProps = {
  grouped: false,
  optionHeight: 31,
  minimumInputSearch: 0,
};

Select.displayName = 'Select';

export default Select;
