// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import ReactDOM from 'react-dom/client';
// PROTOTYPE BRANCH: the demo app renders the shell prototype so the demo
// app's existing Netlify deploy preview shows the prototype. To restore the
// demo app, import App from './App.jsx' here instead.
import App from '../../shell-prototype/src/App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
