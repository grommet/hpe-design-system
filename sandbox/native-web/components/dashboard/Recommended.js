import mockData from '../../mockData/mockData.json';
import { DashboardCard } from '../common/DashboardCard';

export const Recommended = `<div class="gap-medium">
<h2>Recommended for you</h2>
${mockData.services
  .map(service =>
    service.recommended
      ? DashboardCard({ ...service, inline: true, level: 3 })
      : undefined,
  )
  .join('')}
</div>`;
