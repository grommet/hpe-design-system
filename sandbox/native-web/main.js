import 'design-tokens/dist/css/colors.css';
import 'design-tokens/dist/css/colors-dark.css';
import 'design-tokens/dist/css/dimensions-large.css';
import 'design-tokens/dist/css/dimensions-small.css';
import './css/fonts.css';
import './css/components.css';
import './css/app.css';
import './css/utilities.css';
import Sun from 'grommet-icons/img/sun.svg';
import { toggleTheme } from './utils';
import { DashboardCard, PageHeader } from './components';
import mockData from './mockData/mockData.json';

const QuickActions = ({ actions }) => `<div class="gap-medium">
<div class="justify-between">
  <h2>Quick actions</h2>
  ${actions}
</div>
<div>
  <a href="#">Add devices</a>
  <a href="#">Add devices</a>
  <a href="#">Add devices</a>
  <a href="#">Add devices</a>
</div>
</div>`;

const Recommended = `<div class="gap-medium">
<h2>Recommended for you</h2>
${mockData.services
  .map(service => DashboardCard({ ...service, inline: true, level: 3 }))
  .join('')}
</div>`;

const Learn = `<div class="gap-medium">
<h2>Learn</h2>
${mockData.learn
  .map(service => DashboardCard({ ...service, inline: true, level: 3 }))
  .join('')}
</div>`;

document.querySelector('#app').innerHTML = `
  <div class="page">
    <div class="pageContent">
      <div class="container">
      <div class="grid outer">
        <div class="column">
          ${PageHeader({
            title: 'Home',
            actions: `<button class="iconOnly" id="themeToggle">
          <img class="icon" src="${Sun}" />
          </button>`,
          })}
          <div class="contentPane background-contrast">
            <div class="grid flex-flex">
            ${DashboardCard({
              title: 'Find services',
              subtitle: 'Discover and launch services from our catalog.',
            })}
            ${DashboardCard({
              title: 'Manage workspace',
              subtitle: 'Set up this workspace, users, access and more.',
            })}
            </div>
          </div>
          <div class="grid columns-medium">
            ${DashboardCard({
              title: 'Billing summary',
              subtitle: 'August 1-10, 2023',
            })}
            ${DashboardCard({ title: 'Device summary' })}
            ${DashboardCard({ title: 'Sustainability overview' })}
          </div>
          <div class="contentPane">
            <h2>Recent services</h2>
          </div>
          <div class="grid medium-flex">
            ${DashboardCard({ title: 'User overview' })}
            ${DashboardCard({ title: 'Notifications' })}
          </div>
        </div>
        <div class="column">
          <div class="contentPane pad-large">
            ${QuickActions({ actions: '<button class="subtle">Edit</button>' })}
            <hr />
            ${Recommended}
            <hr />
            ${Learn}
          </div>
        </div>
      </div>
      </div>
      <div>
      </div>
      
    </div>
  </div>
`;

toggleTheme(document.querySelector('#themeToggle'));
