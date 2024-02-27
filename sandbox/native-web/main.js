import 'design-tokens/dist/css/colors.css';
import 'design-tokens/dist/css/colors-dark.css';
import 'design-tokens/dist/css/dimensions-large.css';
import 'design-tokens/dist/css/dimensions-small.css';
import './css/components.css';
import './css/fonts.css';
import './css/app.css';
import './css/utilities.css';
import Sun from 'grommet-icons/img/sun.svg';
import { toggleTheme } from './utils';

document.querySelector('#app').innerHTML = `
  <div class="page">
    <div class="pageContent">
    <div class="pageHeader">
      <h1>Console home</h1>
      <button class="iconOnly" id="themeToggle">
        <img class="icon" src="${Sun}" />
      </button>
      </div>
      <div class="container">
      <div class="grid outer">
        <div class="column">
          <div class="grid flex-flex">
            <div class="card interactive">
              <h2>Block Storage</h2>
              <span class="description text-small">
                Last used yesterday, at 8:36pm
              </span>
              <button class="primary">Primary button</button>
            </div>
            <div class="card interactive">
              <h2>Private Cloud Enterprise</h2>
              <span class="description text-small">
                Last used on July 17, 2023, at 8:36pm
              </span>
            </div>
          </div>
          <div class="card">
              <h2>Capacity</h2>
              <span>Volume</span>
              <span class="text-xxlarge">32% 
                <span class="text-medium">used</span>
              </span>
            </div>
        </div>
        <div class="column">
          <div class="card interactive">
            <h2>Find services</h2>
            <span class="description text-small">
              Discover and launch services from out catalog.
            </span>
          </div>
          <div class="card gap-medium">
            <h2>Learn about the new HPE GreenLake Console experience</h2>
            <button class="secondary">Watch now</button>
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

// setupCounter(document.querySelector('#counter'));
// <div class="card">
//        <button class="secondary" id="counter" type="button"></button>
//     </div>
