import 'hpe-design-tokens/dist/css/base.css';
import 'hpe-design-tokens/dist/css/color.light.css';
import 'hpe-design-tokens/dist/css/color.dark.css';
import 'hpe-design-tokens/dist/css/components.css';
import 'hpe-design-tokens/dist/css/global.css';
import 'hpe-design-tokens/dist/css/dimension.medium.css';
import 'hpe-design-tokens/dist/css/dimension.small.css';
import './css/fonts.css';
import './css/components.css';
import './css/app.css';
import './css/utilities.css';

import {
  toggleThemeMode,
  toggleTheme,
  toggleDrop,
  toggleCheckbox,
} from './utils';
import // DashboardCard,
// PageHeader,
// QuickActions,
// DeviceSummary,
// BillingSummary,
// SustainabilityOverview,
// RecentServices,
// Recommended,
// Learn,
// UserOverview,
// Notifications,
// ExpiringSubscriptions,
// MonthlyCharges,
'./components';
import { HPEGreenLakeBadge, Checkmark } from './icons';
import { User } from './icons/User';

const Button = ({ label, kind = 'default', icon }) => `
  <button class="${kind}">${label}${icon || ''}</button>`;

const FormField = ({ label, help, placeholder, input }) => {
  let content = `<input class="${
    label || help ? 'margin-top' : ''
  }" type="text" placeholder="${placeholder}" />`;

  if (input)
    content = `<div class="field-container ${
      label || help ? 'margin-top' : ''
    }">${input}</div>`;

  return `
    <div>
        ${label ? `<label>${label}</label>` : ''}
        ${help ? `<span class="help">${help}</span>` : ''}
        ${content}
    </div>
`;
};

const CheckBox = ({ label, id }) => `
  <div class="checkbox-container">
    <input type="checkbox" aria-hidden="true" tabindex="-1">
    <button id="${id}" role="checkbox" aria-checked="false">${Checkmark({
  size: 'medium',
  color: 'stroke-icon-onPrimary',
})}</button>
    <label>${label}</label>
  </div>
`;

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
      <div class="sandbox gap-medium align-start">
        <h2>Component testing</h2>
        <div class="row gap-small wrap">
          ${Button({ label: 'Default' })}
          ${Button({
            label: 'Secondary hover border color',
            kind: 'secondary',
          })}
          ${Button({
            label: 'Secondary box-shadow approach',
            kind: 'secondary box-shadow',
          })}
          ${Button({ label: 'Primary', kind: 'primary' })}
          ${Button({
            label: 'Primary with icon',
            kind: 'primary',
            icon: User({ color: 'stroke-icon-onPrimary', size: 'medium' }),
          })}
          ${Button({ label: 'Toolbar', kind: 'toolbar' })}
        </div>
        ${FormField({
          label: 'My label',
          help: 'This is some help text.',
          placeholder: 'Placeholder',
        })}
        ${FormField({
          placeholder: 'Placeholder',
        })}
        ${FormField({
          label: 'FormField label',
          input: CheckBox({
            label: 'Checkbox in FormField',
            id: 'formfield-checkbox',
          }),
        })}
        ${CheckBox({ label: 'Standalone checkbox', id: 'standalone-checkbox' })}
        <table>
          <tr>
            <th>Name</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Taylor</td>
            <td>USA</td>
          </tr>
          <tr>
            <td>Oliver</td>
            <td>Ireland</td>
          </tr>
          <tr>
            <td>Joelle</td>
            <td>USA</td>
          </tr>
        </table>
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

toggleCheckbox(document.querySelector('#formfield-checkbox'));
toggleCheckbox(document.querySelector('#standalone-checkbox'));
