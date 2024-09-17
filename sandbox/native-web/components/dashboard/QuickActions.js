export const QuickActions = ({ actions }) => `<div class="gap-medium">
<div class="row align-center justify-between">
  <h2>Quick actions</h2>
  ${actions || ''}
</div>
<div class="gap-small">
  <a href="#">Add devices</a>
  <a href="#">Add service subscriptions</a>
  <a href="#">Add user</a>
  <a href="#">Assign roles</a>
  <a href="#">Create location</a>
</div>
</div>`;
