export const PageHeader = ({
  title,
  actions,
}) => `<div class="pageHeader align-center">
<h1>${title}</h1>
${actions || ''}
</div>`;
