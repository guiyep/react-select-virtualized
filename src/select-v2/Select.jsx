import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import React, { useRef, useImperativeHandle, useState, forwardRef, memo } from 'react';
import './_select.css';
import { buildCustomizableComponents, buildCustomStyles } from './helpers/select';

function Select(props, ref) {
  const reactSelect = useRef('react-select');

  const [selection, setSelection] = useState(props.defaultValue);

  const defaultProps = {
    isMulti: false,
    isClearable: true,
    isDisabled: false,
    className: `react-select-virtualized`,
    isSearchable: true,
    blurInputOnSelect: true,
  };

  const onChangeHandler = (value, { action }) => {
    if (props.onChange) {
      props.onChange(value, { action });
    }
    setSelection(value);
  };

  useImperativeHandle(ref, () => ({
    clear: () => {
      setSelection(null);
    },
    focus: () => {
      reactSelect.current.focus();
    },
    // TODO do we need this?
    select: (item) => setSelection(item),
  }));

  return (
    <ReactSelect
      ref={reactSelect}
      {...defaultProps}
      {...props}
      styles={{ ...buildCustomStyles(props), ...props.styles }} // keep react-select styles implementation and pass to any customization done
      value={selection}
      onChange={onChangeHandler}
      options={props.options}
      components={buildCustomizableComponents(props)}
    />
  );
}

Select = forwardRef(Select);

Select.propTypes = {
  ...ReactSelect.propTypes,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  formatOptionLabel: PropTypes.func,
  formatGroupLabel: PropTypes.func,
  optionLabelHeight: PropTypes.number,
  defaultValue: PropTypes.object,
  groupLabelHeight: PropTypes.number,
  virtualizeList: PropTypes.bool,
};

Select.defaultProps = {
  virtualizeList: true,
};

export default memo(Select);
