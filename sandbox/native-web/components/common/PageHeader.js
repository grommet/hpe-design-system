export const PageHeader = ({ title, actions }) => `<div class="pageHeader">
<h1>${title}</h1>
${actions || ''}
</div>`;
