import React from 'react';
import { components as ReactSelectComponents } from 'react-select';

const InputBuilder = () => (props) => <ReactSelectComponents.Input {...props} isDisabled={!!props.selectProps.value} />;

export default InputBuilder;
