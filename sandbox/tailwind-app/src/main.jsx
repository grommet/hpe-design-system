import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@radix-ui/themes/styles.css';
import 'hpe-design-tokens/dist/css/base.css';
import 'hpe-design-tokens/dist/css/color.light.css';
import 'hpe-design-tokens/dist/css/color.dark.css';
import 'hpe-design-tokens/dist/css/dimension.medium.css';
import 'hpe-design-tokens/dist/css/dimension.small.css';
import 'hpe-design-tokens/dist/css/global.css';
import 'hpe-design-tokens/dist/css/components.css';
import './index.css';
// import './mui.css';
import './fonts.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
