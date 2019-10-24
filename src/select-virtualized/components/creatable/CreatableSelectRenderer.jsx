import React, { memo } from 'react';
import PropTypes from 'prop-types';
import CreatableSelectControlledContainer from './CreatableSelectControlledContainer';
import CreatableSelectUncontrolledContainer from './CreatableSelectUncontrolledContainer';

const CreatableSelectRenderer = memo((props) => {
  const { value, onCreateOption, grouped } = props;
  // render a controlled component
  if (value !== undefined) {
    return <CreatableSelectControlledContainer {...props} />;
  }

  if (onCreateOption) {
    throw new Error('creatable component cannot be used as uncontrolled with onCreateOption');
  }

  // render an uncontrolled component

  if (grouped) {
    throw new Error('creatable component cannot be used as uncontrolled and grouped');
  }

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
