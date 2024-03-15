import PropTypes from 'prop-types';

const sizes = {
  small: {
    label: 'small',
    value: 'xlarge',
    unit: 'xsmall',
  },
  medium: {
    label: 'medium',
    value: 'xxlarge',
    unit: 'small',
  },
  large: {
    label: 'large',
    value: '3xl',
    unit: 'medium',
  },
};

export const Metric = ({ label, value, unit, options, size = 'medium' }) =>
  `<div>
    <span class="text-${sizes[size].label}">${label}</span>
    <span class="text-${sizes[size].unit}">
      <span class="text-${sizes[size].value} text-emphasis">
        ${Intl.NumberFormat(undefined, options).format(value)}
      </span> 
      ${unit || ''}
    </span>
  </div>`;

Metric.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  unit: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  options: PropTypes.shape({}),
};
