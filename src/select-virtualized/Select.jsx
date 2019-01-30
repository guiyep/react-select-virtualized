import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import React, { useRef, useImperativeHandle, useState, forwardRef, memo } from 'react';
import './styles.css';
import { buildListComponents, getStyles } from './helpers/select';
import 'react-virtualized/styles.css';

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
      styles={{ ...getStyles(), ...props.styles }} // keep react-select styles implementation and pass to any customization done
      value={selection}
      onChange={onChangeHandler}
      options={props.options}
      components={buildListComponents(props)}
    />
  );
}

Select = forwardRef(Select);

Select.propTypes = {
  ...ReactSelect.propTypes,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  formatGroupHeaderLabel: PropTypes.func,
  optionHeight: PropTypes.number,
  groupHeaderHeight: PropTypes.number,
  defaultValue: PropTypes.object,
  virtualizeList: PropTypes.bool,
};

Select.defaultProps = {
  virtualizeList: true,
};

export default memo(Select);
