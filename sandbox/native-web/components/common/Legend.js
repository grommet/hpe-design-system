export const Legend = ({ label, background, value }) => `
<div class="row gap-xsmall align-center justify-between">
<div class="row gap-xsmall align-center">
<div
  class="legend-circle background-${background}"
></div>
<span class="text-small text-emphasis">
  ${label}
</span>
</div>
<span class="text-small text-emphasis">
  ${value || ''}
</span>
</div>`;
