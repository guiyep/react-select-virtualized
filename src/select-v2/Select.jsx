import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import React, { useRef, useEffect, useImperativeHandle, useState, forwardRef, memo } from 'react';
import './_select.css';
import { buildCustomizableComponents, buildCustomStyles } from './helpers/select';

function Select(props, ref) {
  const reactSelect = useRef('react-select');

  const [selection, setSelection] = useState(props.defaultValue);

  const defaultProps = {
    isMulti: false,
    isClearable: true,
    isDisabled: props.disabled,
    className: `select-popup`,
    isSearchable: true,
    blurInputOnSelect: true,
  };

  const onChangeHandler = (value, { action }) => {
    if (props.onValueChange) {
      props.onValueChange(value, { action });
    }
    setSelection(value);
  };

  const onBlur = () => {
    if (props.focus && props.onFocusOut) {
      props.onFocusOut();
    }
    if (props.onBlur) {
      props.onBlur();
    }
  };

  useEffect(() => {
    if (props.focus) {
      reactSelect.current.focus();
    }
  });

  useImperativeHandle(ref, () => ({
    clear: () => {
      setSelection(null);
    },
  }));

  return (
    <ReactSelect
      ref={reactSelect}
      {...defaultProps}
      {...props}
      styles={buildCustomStyles(props)}
      value={selection}
      onChange={onChangeHandler}
      options={props.options}
      onBlur={onBlur}
      components={buildCustomizableComponents(props)}
    />
  );
}

Select = forwardRef(Select);

Select.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  focus: PropTypes.bool,
  onBlur: PropTypes.func,
  onValueChange: PropTypes.func,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  formatOptionLabel: PropTypes.func,
  formatGroupLabel: PropTypes.func,
  noOptionsMessage: PropTypes.func,
  onFocusOut: PropTypes.func,
  options: PropTypes.array,
  defaultValue: PropTypes.object,
  optionLabelHeight: PropTypes.number,
  groupLabelHeight: PropTypes.number,
  virtualizeList: PropTypes.bool,
  disableInputOnSelection: PropTypes.bool,
};

Select.defaultProps = {
  disabled: false,
  focus: false,
  options: [],
  virtualizeList: true,
  disableInputOnSelection: false,
};

export default memo(Select);
