import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import raven from 'raven-js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './app';

try {
  const sentry = raven.config('*** GET YOUR SENTRY KEY FROM SOMEWHERE ***', {
    autoBreadcrumbs: true
  }).install();
}
catch (e) {
  console.error('Failed to install sentry', e);
}

injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('appRoot')
);