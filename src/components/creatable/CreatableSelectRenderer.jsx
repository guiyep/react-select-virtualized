import React, { memo } from 'react';
import PropTypes from 'prop-types';
import CreatableSelectControlledContainer from './CreatableSelectControlledContainer';
import CreatableSelectUncontrolledContainer from './CreatableSelectUncontrolledContainer';
import { buildErrorText } from '@rsv-lib/error';

const CreatableSelectRenderer = memo((props) => {
  const { value, onCreateOption, grouped } = props;

  if (grouped) {
    throw new Error(buildErrorText('Creatable component does not support grouped yet'));
  }

  // render a controlled component
  if (value !== undefined) {
    return <CreatableSelectControlledContainer {...props} />;
  }

  if (onCreateOption) {
    throw new Error(buildErrorText('Creatable component cannot be used as uncontrolled with onCreateOption'));
  }

  // render an uncontrolled component
  return <CreatableSelectUncontrolledContainer {...props} />;
});

CreatableSelectRenderer.displayName = 'CreatableSelectRenderer';

CreatableSelectRenderer.propTypes = {
  onCreateOption: PropTypes.func,
};

CreatableSelectRenderer.defaultProps = {
  onCreateOption: undefined,
};

export default CreatableSelectRenderer;
