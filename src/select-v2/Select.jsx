import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import './_select.css';
import { buildCustomizableComponents, buildCustomStyles } from './helpers/select-helpers';

const PureSelect = (props) => {
  const reactSelect = useRef(null);

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
      reactSelect.focus();
    }
  });

  return (
    <ReactSelect
      ref={reactSelect}
      {...defaultProps}
      {...props}
      styles={buildCustomStyles(props)}
      value={props.defaultValue}
      onChange={onChangeHandler}
      options={props.options}
      onBlur={onBlur}
      components={buildCustomizableComponents(props)}
    />
  );
};

// class Select extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.onBlur = this.onBlur.bind(this);
//     this.onChangeHandler = this.onChangeHandler.bind(this);
//   }

//   componentDidUpdate() {
//     // unfortunately the autoFocus prop from react-select do not support changes on the prop. the focus default state is false and then is apply. as a result
//     // the focus is never apply. we need to listen to the updates and trigger the react-select focus method when this occurs.
//     if (this.props.focus) {
//       this.reactSelect.focus();
//     }
//   }

//   onChangeHandler(value, { action }) {
//     if (this.props.onValueChange) {
//       this.props.onValueChange(value, { action });
//     }
//   }

//   onBlur() {
//     if (this.props.focus && this.props.onFocusOut) {
//       this.props.onFocusOut();
//     }
//     if (this.props.onBlur) {
//       this.props.onBlur();
//     }
//   }

//   render() {
//     const props = this.props;
//     const defaultProps = {
//       isMulti: false,
//       isClearable: true,
//       isDisabled: props.disabled,
//       className: `select-popup`,
//       isSearchable: true,
//       blurInputOnSelect: true,
//     };
//     return (
//       <ReactSelect
//         ref={(c) => {
//           this.reactSelect = c;
//         }}
//         {...defaultProps}
//         {...props}
//         styles={buildCustomStyles(props)}
//         value={props.empty ? null : this.state.selected}
//         onChange={this.onChangeHandler}
//         options={props.options}
//         onBlur={this.onBlur}
//         components={buildCustomizableComponents(props)}
//       />
//     );
//   }
// }

PureSelect.propTypes = {
  disabled: PropTypes.bool,
  styleClass: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  listItemClassName: PropTypes.string,
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

PureSelect.defaultProps = {
  disabled: false,
  styleClass: undefined,
  name: undefined,
  placeholder: undefined,
  listItemClassName: undefined,
  focus: false,
  onBlur: undefined,
  onValueChange: undefined,
  getOptionLabel: undefined,
  getOptionValue: undefined,
  formatOptionLabel: undefined,
  formatGroupLabel: undefined,
  noOptionsMessage: undefined,
  onFocusOut: undefined,
  options: [],
  defaultValue: undefined,
  optionLabelHeight: undefined,
  groupLabelHeight: undefined,
  virtualizeList: true,
  disableInputOnSelection: false,
};

export default PureSelect;
