import 'design-tokens/dist/css/colors.css';
import 'design-tokens/dist/css/colors-dark.css';
import 'design-tokens/dist/css/dimensions-large.css';
import 'design-tokens/dist/css/dimensions-small.css';
import './css/fonts.css';
import './css/components.css';
import './css/app.css';
import './css/utilities.css';

import { toggleTheme } from './utils';
import {
  DashboardCard,
  PageHeader,
  QuickActions,
  DeviceSummary,
  BillingSummary,
  SustainabilityOverview,
  RecentServices,
  Recommended,
  Learn,
  UserOverview,
  Notifications,
  ExpiringSubscriptions,
  MonthlyCharges,
} from './components';
import { AppsRounded, Sun, UserAdd, HPEGreenLakeBadge } from './icons';

document.querySelector('#app').innerHTML = `
  <div class="globalHeader">
      <div class="greenlake-badge">
      ${HPEGreenLakeBadge()}
      </div>
      <button class="iconOnly" id="themeToggle">
        ${Sun({ color: 'stroke-text-strong', size: 'medium' })}
      </button>
  </div>
  <div class="page">
    <div class="pageContent">
      <div class="container">
        <div class="grid outer">
          <div class="column">
            <div class="gap-medium">
              ${PageHeader({
                title: 'Home',
                actions: '<button>Customize</button>',
              })}
              <div class="grid flex-flex">
                ${DashboardCard({
                  title: 'Find services',
                  subtitle: 'Discover and launch services from our catalog.',
                  icon: `<div class="border-xsmall border-default radius-medium 
                  pad-small background-brand-weak">${AppsRounded({
                    color: 'foreground-brand-default',
                    size: 'xlarge',
                  })}</div>`,
                })}
                ${DashboardCard({
                  title: 'Manage workspace',
                  subtitle: 'Set up this workspace, users, access and more.',
                  icon: `<div class="border-xsmall border-default radius-medium 
                  pad-small background-brand-weak">${UserAdd({
                    color: 'foreground-brand-default',
                    size: 'xlarge',
                  })}</div>`,
                })}
              </div>
            </div>
            <div class="grid columns-medium">
              ${BillingSummary()}
              ${DeviceSummary()}
              ${SustainabilityOverview()}
            </div>
            ${RecentServices()}
            <div class="grid medium-flex">
              ${UserOverview()}
              ${Notifications()}
            </div>
            <div class="grid flex-flex">
              ${MonthlyCharges()}
              ${ExpiringSubscriptions()}
            </div>
          </div>
          <div class="column">
            <div class="contentPane pad-large">
              ${QuickActions({
                actions: '<button class="subtle">Edit</button>',
              })}
              <hr />
              ${Recommended}
              <hr />
              ${Learn}
            </div>        
          </div>
        </div>
      </div>
    </div>
  </div> 
`;

toggleTheme(document.querySelector('#themeToggle'));
