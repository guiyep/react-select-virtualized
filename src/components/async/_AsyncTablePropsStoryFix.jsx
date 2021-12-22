import PropTypes from 'prop-types';
import React from 'react';

import { optionsPropTypes } from '@rsv-lib/prop-types';
import AsyncComponent from './Async';

const Async = (props) => <AsyncComponent {...props} />;

Async.propTypes = {
  minimumInputSearch: PropTypes.number,
  onChange: PropTypes.func,
  grouped: PropTypes.bool, // this is only for performance enhancement so we do not need to iterate in the array many times. It is not needed if formatGroupHeaderLabel or groupHeaderHeight are defined
  formatGroupHeaderLabel: PropTypes.func,
  optionHeight: PropTypes.number,
  groupHeaderHeight: PropTypes.number,
  defaultValue: PropTypes.object,
  defaultOptions: optionsPropTypes,
  loadOptions: PropTypes.func.isRequired,
  onInputChange: PropTypes.func,
  cacheOptions: PropTypes.bool,
};

Async.defaultProps = {
  grouped: false,
  optionHeight: 31,
  minimumInputSearch: 0,
  cacheOptions: true,
};

Async.displayName = 'Async';

export default Async;
