import React, { forwardRef, memo, Fragment, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import { optionsPropTypes } from './helpers/prop-types';

const Async = memo(({ defaultOptions, ...props }) => {
  return <Select {...props} options={defaultOptions} />;
});

Async.propTypes = {
  defaultOptions: optionsPropTypes.isRequired,
  loadOptions: PropTypes.func.isRequired,
};

export default Async;
