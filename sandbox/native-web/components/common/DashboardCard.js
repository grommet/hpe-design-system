import { LinkNext } from '../../icons/LinkNext';

export const DashboardCard = ({
  icon,
  title,
  body,
  footer,
  subtitle,
  inline,
  level = 2,
}) => `<div class="card ${inline ? 'inline' : 'interactive'} gap-medium">
          <div class="row gap-small justify-between">
            <div class="row gap-small">
              ${icon ? `<div>${icon}</div>` : ''}
              <div class="gap-xsmall">
                <h${level}>
                  ${title}
                </h${level}>
                ${subtitle ? `<span class="text-small">${subtitle}</span>` : ''}
              </div>
            </div>
            <div>
                ${LinkNext({ color: 'primary' })}
            </div>
          </div>
  ${body ? `<div class="card-body">${body}</div>` : ''}
  ${footer ? `<div>${footer}</div>` : ''}
  </div>`;
