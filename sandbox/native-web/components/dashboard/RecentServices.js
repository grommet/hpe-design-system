import mockData from '../../mockData/mockData.json';

const dates = [
  '2024-02-28T20:04:00.000Z',
  '2024-03-30T17:25:00.000Z',
  '2024-03-10T19:37:00.000Z',
  '2024-03-04T23:14:00.000Z',
  '2024-03-02T20:19:00.000Z',
];

export const RecentServices = () => `
<div class="gap-medium">
    <div class="row justify-between">
        <h2>Recent services</h2>
        <a>My services</a>
    </div>
    <div>
    ${mockData.services
      .slice(0, 5)
      .map(
        service =>
          `<div class="services-list">
            <span class="text-emphasis">${service.name}</span>
            <span>${service.category}</span>
            <span>${Intl.DateTimeFormat(undefined, {
              timeStyle: 'short',
              dateStyle: 'medium',
            }).format(
              new Date(dates[Math.floor(Math.random() * dates.length)]),
            )}</span>
            <div class="align-end">
                <button class="secondary">Launch</button>
            </div>
        </div>`,
      )
      .join('')}
    </div>
</div>
`;
