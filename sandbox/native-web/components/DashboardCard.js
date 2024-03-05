export const DashboardCard = ({
  icon,
  title,
  body,
  footer,
  subtitle,
  inline,
  level = 2,
}) => `<div class="card ${inline ? 'inline' : 'interactive'}">
          <div>
            <div class="gap-small">
              ${icon ? `<div>${icon}</div>` : ''}
              <div class="gap-xsmall">
                <h${level}>
                  ${title}
                </h${level}>
                ${subtitle ? `<span class="text-small">${subtitle}</span>` : ''}
              </div>
            </div>
            <div>
                icon
            </div>
          </div>
  ${body ? `<div>${body}</div>` : ''}
  ${footer ? `<div>${footer}</div>` : ''}
  </div>`;
