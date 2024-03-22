import 'design-tokens/dist/css/colors-light.css';
import 'design-tokens/dist/css/colors-dark.css';
import 'design-tokens/dist/css/colors-warm-light.css';
import 'design-tokens/dist/css/colors-warm-dark.css';
import 'design-tokens/dist/css/elevation-light.css';
import 'design-tokens/dist/css/dimensions-large.css';
import 'design-tokens/dist/css/dimensions-small.css';
import 'design-tokens/dist/css/motion.css';
import './css/fonts.css';
import './css/components.css';
import './css/app.css';
import './css/utilities.css';

import { toggleThemeMode, toggleTheme, toggleDrop } from './utils';
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
import { AppsRounded, UserAdd, HPEGreenLakeBadge } from './icons';
import { User } from './icons/User';

document.querySelector('#app').innerHTML = `
  <div class="globalHeader">
      <div class="greenlake-badge">
      ${HPEGreenLakeBadge()}
      </div>
      <div class="row gap-small align-center">
        <div class="dropParent">
        <button class="iconOnly" id="userDrop">
          ${User({ color: 'stroke-text-strong', size: 'medium' })}
        </button>
        <div id="userDropContent" class="dropContent">
        <div class="gap-medium  width-medium">
          <h2>Change theme</h2>
          <div role="group" class="row  border-weak border-xsmall 
          radius-medium">
            <button role="radio" id="lightMode" 
              class="active radius-medium width-full">Light</button>
            <button role="radio" id="darkMode" 
              class="radius-medium width-full">Dark</button>
          </div>
          <div role="group" class="row  border-weak border-xsmall 
          radius-medium">
            <button role="radio" id="currentTheme" 
              class="active radius-medium width-full">Current theme</button>
            <button role="radio" id="warmTheme" 
              class="radius-medium width-full">Warm theme</button>
          </div>
        </div>
        </div>
        </div>
      </div>
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

toggleThemeMode(document.querySelector('#lightMode'));
toggleThemeMode(document.querySelector('#darkMode'));
toggleTheme(document.querySelector('#currentTheme'));
toggleTheme(document.querySelector('#warmTheme'));
toggleDrop(
  document.querySelector('#userDrop'),
  document.querySelector('#userDropContent'),
);
