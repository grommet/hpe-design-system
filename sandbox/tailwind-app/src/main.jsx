import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './fonts.css';
import 'design-tokens/dist/css/base.css';
import 'design-tokens/dist/css/color.light.css';
import 'design-tokens/dist/css/color.dark.css';
import 'design-tokens/dist/css/dimension.large.css';
import 'design-tokens/dist/css/dimension.small.css';
import 'design-tokens/dist/css/components.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
