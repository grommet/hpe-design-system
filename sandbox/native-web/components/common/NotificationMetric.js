import PropTypes from 'prop-types';
import { StatusCritical } from '../../icons/StatusCritical';
import { StatusOk } from '../../icons/StatusOk';
import { StatusInfo } from '../../icons/StatusInfo';
import { StatusWarning } from '../../icons/StatusWarning';

const statuses = {
  critical: {
    background: 'background-status-critical',
    icon: StatusCritical({
      color: 'stroke-foreground-status-critical',
      size: 'medium',
    }),
    label: 'Critical',
  },
  warning: {
    background: 'background-status-warning',
    icon: StatusWarning({
      color: 'stroke-foreground-status-warning',
      size: 'medium',
    }),
    label: 'Warning',
  },
  ok: {
    background: 'background-status-ok',
    icon: StatusOk({
      color: 'stroke-foreground-status-ok',
      size: 'medium',
    }),
    label: 'Ok',
  },
  info: {
    background: 'background-status-info',
    icon: StatusInfo({
      color: 'stroke-foreground-status-info',
      size: 'medium',
    }),
    label: 'Information',
  },
};

export const NotificationMetric = ({ status, value }) => {
  const { icon, label, background } = statuses[status] || {};

  return `<div
        class="row ${background} 
        gap-small pad-small radius-large wrap"
    >
        ${icon || ''}
      <span>
        <span class="text-emphasis">${value}</span> ${label}
      </span>
    </div>`;
};

NotificationMetric.propTypes = {
  status: PropTypes.string,
  value: PropTypes.number,
};
