import { DashboardCard } from '../common/DashboardCard';
import mockData from '../../mockData/mockData.json';

export const Learn = `<div class="gap-medium">
<h2>Learn</h2>
${mockData.learn
  .map(service => DashboardCard({ ...service, level: 3 }))
  .join('')}
</div>`;
