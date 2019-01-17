import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import React from 'react';
import './_select.css'
import { buildCustomizableComponents, buildCustomStyles } from './helpers/select-helpers';

class Select extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    // the react-select need to set the value to null to clear the input programmatically, so we need to track the state of the selection
    // so we update the state when the value change and we clear it when angular update the value. This will be removed when we get rid of angular
    // and we will expose a clear method so we do not enforce a two ways data binding.
    this.state = {
      selected: props.defaultValue || null,
    };
  }

  componentDidUpdate() {
    // unfortunately the autoFocus prop from react-select do not support changes on the prop. the focus default state is false and then is apply. as a result
    // the focus is never apply. we need to listen to the updates and trigger the react-select focus method when this occurs.
    if (this.props.focus) {
      this.reactSelect.focus();
    }
  }

  onChangeHandler(value, { action }) {
    if (this.props.onValueChange) {
      this.props.onValueChange(value, { action });
    }
    this.setState({
      selected: value,
    });
  }

  onBlur() {
    if (this.props.focus && this.props.onFocusOut) {
      this.props.onFocusOut();
    }
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  render() {
    const props = this.props;
    const defaultProps = {
      isMulti: false,
      isClearable: true,
      isDisabled: props.disabled,
      className: `select-popup`,
      isSearchable: true,
      blurInputOnSelect: true,
    };
    return (
      <ReactSelect
        ref={(c) => {
          this.reactSelect = c;
        }}
        {...defaultProps}
        {...props}
        styles={buildCustomStyles(props)}
        value={props.empty ? null : this.state.selected}
        onChange={this.onChangeHandler}
        options={props.options}
        onBlur={this.onBlur}
        components={buildCustomizableComponents(props)}
      />
    );
  }
}

Select.propTypes = {
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

Select.defaultProps = {
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

export default Select;
