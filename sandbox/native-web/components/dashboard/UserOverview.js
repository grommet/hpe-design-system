/* eslint-disable max-len */
import { DashboardCard } from '../common/DashboardCard';
import { Legend } from '../common/Legend';
import { Notification } from '../common/Notification';

const UserPieChart =
  () => `<svg width="144" height="144" viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_2501_58390" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="144" height="144">
<ellipse cx="72" cy="71.8033" rx="72" ry="71.8033" fill="#F08934"/>
</mask>
<g mask="url(#mask0_2501_58390)">
<path d="M71.5068 72.3725V-23.9839L111.503 -29.0967L144 17.705V97.1499L71.5068 72.3725Z" fill="#00C8FF" class="fill-chart-qualitative-70"/>
</g>
<mask id="mask1_2501_58390" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="144" height="144">
<circle cx="72" cy="72" r="72" fill="#69E4D0" />
</mask>
<g mask="url(#mask1_2501_58390)">
<path d="M72.0003 72.493V-24.1646L22.2093 -15.5204L-6.41064 46.5605L72.0003 72.493Z" fill="#7630EA" class="fill-chart-qualitative-30"/>
<path d="M63.3002 -2.46777L71.9993 72.4911L47.835 0.21805L63.3002 -2.46777Z" fill="#00C8FF" class="fill-chart-qualitative-70"/>
<path d="M47.8364 0.249512L72.2473 72.9892L28.1104 9.12622L47.8364 0.249512Z" fill="#7630EA" class="fill-chart-qualitative-30"/>
<path d="M29.5901 11.0967L72.4942 73.4802C52.8504 57.6994 13.3161 26.0885 12.3298 25.8912C11.3435 25.6939 23.4257 15.946 29.5901 11.0967Z" fill="#7630EA" class="fill-chart-qualitative-30"/>
<path d="M63.124 -2.46777L72.0007 72.4911V-2.46777H63.124Z" fill="#00C8FF" class="fill-chart-qualitative-70"/>
</g>
<mask id="mask2_2501_58390" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="144" height="144">
<circle cx="72" cy="72" r="72" fill="#7630EA" />
</mask>
<g mask="url(#mask2_2501_58390)">
<path d="M71.9994 72.3946L-7.08252 46.8208V149.116H71.9994V72.3946Z" fill="#FEC901" class="fill-chart-qualitative-50" />
</g>
<mask id="mask3_2501_58390" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="144" height="144">
<circle cx="72" cy="72" r="72" fill="#00739D" />
</mask>
<g mask="url(#mask3_2501_58390)">
<path d="M72 150.688V72.3931L117.639 134.95L72 150.688Z" fill="#00C8FF" class="fill-chart-qualitative-70"/>
</g>
<mask id="mask4_2501_58390" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="144" height="144">
<circle cx="72" cy="72" r="72" fill="#307299"/>
</mask>
<g mask="url(#mask4_2501_58390)">
<path d="M72 72.4941L144.493 96.9051L120.687 139.28L72 72.4941Z" fill="#00C8FF" class="fill-chart-qualitative-70"/>
</g>
</svg>
`;

export const UserOverview = () =>
  `${DashboardCard({
    title: 'User overview',
    body: `
    <div class="gap-medium">
    <div class="align-center">
${UserPieChart()}
</div>
  <div class="gap-small">
  <div class="row justify-between gap-medium border-bottom-xsmall border-weak pad-block-small">
    <span class="text-small text-emphasis">Total</span>
    <span class="text-small text-emphasis">232</span>
  </div>
  ${Legend({
    label: 'Active',
    background: 'chart-qualitative-70',
    value: 163,
  })}
  ${Legend({
    label: 'Inactive',
    background: 'chart-qualitative-50',
    value: 40,
  })}
  ${Legend({
    label: 'Unverified',
    background: 'chart-qualitative-30',
    value: 19,
  })}
  </div>
  </div>
  `,
    footer: `${Notification({
      message: '19 unverified users to be removed.',
      status: 'warning',
    })}`,
  })}`;
