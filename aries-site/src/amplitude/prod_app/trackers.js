/* eslint-disable max-classes-per-file */
// import { 
//   init,
//   track as trackAmplitude
// } from '@amplitude/analytics-browser';
import { buildDatalayerCommon } from './datalayer/common';

import {
  // AMPLITUDE_APIKEY_DEV,
  // AMPLITUDE_APIKEY_PROD,
  GREENLAKE_DEV_SITE,
  GREENLAKE_PROD_SITE,
  PAGE_EVENT_NAME,
} from './constants';

export class AbstractTracker {
  constructor(window, log, debug = false, oktaId = undefined) {
    this.window = window;
    this.log = log;
    this.debug = debug;
    this.oktaId = oktaId;
  }

  buildDatalayer(ruleName, screenURI = undefined) {
    // Duplicate to ensure we don't mess with constant data
    const datalayer = buildDatalayerCommon(this.window, this.log);
    const { pageInfo } = datalayer.page;
    if (screenURI) {
      pageInfo.screen_uri = screenURI;
      // Screen URI is '/' or small
      const name = screenURI.length <= 1 ? 'return-to-main-screen' : screenURI;
      pageInfo.screen_name = name
        .replace(/^[/:]+/g, '')
        .replace(/\/+/g, ':');
    }
    datalayer.diagnostics.rule = ruleName;
    this.lastDatalayer = datalayer;
    return datalayer;
  }
}

export class AmplitudeTracker extends AbstractTracker {
  setup() {
    const { hostname } = window.location;
    // const isProd = process.env.NODE_ENV !== 'production' 
    //   ? AMPLITUDE_APIKEY_DEV
    //   : AMPLITUDE_APIKEY_PROD;
    const isProd =
      GREENLAKE_PROD_SITE.test(hostname) && !GREENLAKE_DEV_SITE.test(hostname);
    console.log('NODE', process.env.NODE_ENV, isProd);
    // const apiKey = isProd ? AMPLITUDE_APIKEY_DEV : AMPLITUDE_APIKEY_PROD;
    if (this.oktaId) {
      this.log.info(
        // eslint-disable-next-line max-len
        `***FOUND: Okta ID=${this.oktaId}, initializing Amplitude with known user setup`,
      );
      // init(apiKey, this.oktaId);
    } else {
      this.log.info(
        // eslint-disable-next-line max-len
        '***NOT FOUND: No Okta ID, initializing Amplitude with anonymous data collection',
      );
      // init(apiKey);
    }
  }

  buildDatalayer(ruleLabel, screenURI = undefined) {
    const datalayer = super.buildDatalayer(ruleLabel, screenURI);
    const amplitudeDL = {
      'Business Unit': datalayer.page.pageInfo.business_unit,
      URL: this.window.location.href,
      'Document Title': this.window.document.title || 'No document title',
      Diagnostics: datalayer.diagnostics,
    };
    return amplitudeDL;
  }

  track(ruleLabel, eventName = PAGE_EVENT_NAME, datalayer = undefined) {
    const dataLayerToUse =
      datalayer !== undefined ? datalayer : this.buildDatalayer(ruleLabel);
    console.log('TRACK', eventName, dataLayerToUse);
    // trackAmplitude(eventName, dataLayerToUse); // Amplitude Track
    this.log.info(
      // eslint-disable-next-line max-len
      `***Amplitude:-${ruleLabel}:track event_name=${eventName}, ${JSON.stringify(
        dataLayerToUse,
        null,
        2,
      )}`,
      dataLayerToUse,
      this.lastDatalayer,
    );
  }
}
