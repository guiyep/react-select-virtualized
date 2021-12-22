import PropTypes from 'prop-types';
import React, { useRef, useImperativeHandle, useState, forwardRef, useMemo, memo, useCallback, useEffect } from 'react';
import './styles.css';
import { buildListComponents, getStyles } from '@rsv-lib/select';
import { defaultGroupFormat } from '@rsv-lib/renderers';
import 'react-virtualized/styles.css';
import { optionsPropTypes } from '@rsv-lib/prop-types';
import { buildErrorText } from '@rsv-lib/error';
import { FastReactSelect } from '../fast-react-select';

const throwMixControlledError = () => {
  throw new Error(
    buildErrorText(
      `Select do not support using defaultValue and value at the same time. Choose between uncontrolled or controlled component.
    Clear and Select component methods can only be used with uncontrolled components`,
    ),
  );
};

const SelectComponent = (props, ref) => {
  const reactSelect = useRef('react-select');

  const { grouped, formatGroupHeaderLabel, groupHeaderHeight, onChange, defaultValue, value, optionHeight, creatable } =
    props;

  if (defaultValue && value) {
    throwMixControlledError();
  }

  const [selection, setSelection] = useState(defaultValue || value);

  const defaultProps = {
    isMulti: false,
    isClearable: true,
    isDisabled: false,
    className: `react-select-virtualized`,
    isSearchable: true,
    blurInputOnSelect: true,
  };

  useEffect(() => setSelection(value), [value]);

  const memoGroupHeaderOptions = useMemo(() => {
    if (!grouped && !formatGroupHeaderLabel && !groupHeaderHeight) return { formatGroupHeaderLabel: false };

    const groupHeaderHeightValue = groupHeaderHeight || optionHeight;
    return {
      groupHeaderHeight: groupHeaderHeightValue,
      formatGroupHeaderLabel: formatGroupHeaderLabel || defaultGroupFormat(groupHeaderHeightValue),
    };
  }, [grouped, formatGroupHeaderLabel, groupHeaderHeight, optionHeight]);

  const onChangeHandler = useCallback(
    (valueChanged, { action }) => {
      onChange(valueChanged, { action });
      setSelection(valueChanged);
    },
    [onChange, setSelection],
  );

  useImperativeHandle(ref, () => ({
    clear: () => {
      if (value) {
        throwMixControlledError();
      }
      setSelection(null);
    },
    focus: () => {
      reactSelect.current.focus();
    },
    blur: () => {
      reactSelect.current.blur();
    },
    select: (item) => {
      if (value) {
        throwMixControlledError();
      }
      setSelection(item);
    },
  }));

  return (
    <FastReactSelect
      creatable={creatable}
      ref={reactSelect}
      {...defaultProps}
      {...props}
      styles={{ ...getStyles(), ...props.styles }} //  keep react-select styles implementation and pass to any customization done
      value={value !== undefined ? value : selection}
      onChange={onChangeHandler}
      options={props.options}
      components={{
        ...props.components,
        ...buildListComponents({
          ...props,
          ...memoGroupHeaderOptions,
        }),
      }} // props.components comes from react-select if present
    />
  );
};

const SelectForward = forwardRef(SelectComponent);

const Select = memo(SelectForward);

Select.propTypes = {
  ...FastReactSelect.propTypes,
  options: optionsPropTypes.isRequired,
  onChange: PropTypes.func,
  grouped: PropTypes.bool, // this is only for performance enhancement so we do not need to iterate in the array many times. It is not needed if formatGroupHeaderLabel or groupHeaderHeight are defined
  formatGroupHeaderLabel: PropTypes.func,
  optionHeight: PropTypes.number,
  groupHeaderHeight: PropTypes.number,
  defaultValue: PropTypes.object,
  creatable: PropTypes.bool,
};

Select.defaultProps = {
  grouped: false,
  optionHeight: 31,
  creatable: false,
  onChange: () => {},
};

Select.displayName = 'Select';

export default Select;
