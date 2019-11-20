import PropTypes from 'prop-types';

const oneOptionPropType = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
});

export const optionsPropTypes = PropTypes.arrayOf(
  PropTypes.oneOfType([
    oneOptionPropType,
    PropTypes.shape({
      label: PropTypes.string,
      options: PropTypes.arrayOf(oneOptionPropType),
    }),
  ]),
);
