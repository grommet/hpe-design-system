const IS_PRIVACY_ANSWERED_REGEXP = /hpeuck_answ\s*=\s*([^;]+)/i;
const PRIVACY_STATE_REGEXP = /hpeuck_prefs\s*=([^;]+)/i;
const PRIVACY_ACTIVE_REGEXP = /hpeuck_cktst\s*/;
const COOKIE_VALIDATE_REGEXP = /^[01]{1,5}$/;

export const ALREADY_CHECKED_PRIVACY_STATE =
  '___tmp_already_checked_privacy_state';
export const ALREADY_LOADED_BRANDMKTG = '___tmp_already_loaded_brandmktg';

export class PrivacyState {
  constructor (window) {
    this.privacyActive = false;
    this.optInAnswered = false;
    this.validPrivacyCookieFlag = false;
    // Defaults if there's NO privacy consent banner 
    // check at all, PRIVACY_ACTIVE_REGEXP = false
    this.necessaryCookies = true;
    this.performanceAnalyticsCookies = false;
    this.personalizationCookies = false;
    this.targetingCookies = false;
    this.ccpaConsentCookies = false;
    this.compute(window);
  }

  compute (window) {
    const { cookie } = window.document;
    this.isPrivacyActive = PRIVACY_ACTIVE_REGEXP.test(cookie);
    if (this.isPrivacyActive) { // If privacy check is enabled, then
      const answeredCookie = IS_PRIVACY_ANSWERED_REGEXP.exec(cookie);
      if (answeredCookie && /1/.test(answeredCookie[1])) {
        this.optInAnswered = true;
      } else {
        this.optInAnswered = false;
      }
      // Specific privacy preferences: parse these
      const privacyState = PRIVACY_STATE_REGEXP.exec(cookie);
      const cookiePrefs = privacyState ? privacyState[1].trim() : '';
      this.validPrivacyCookieFlag = COOKIE_VALIDATE_REGEXP.test(cookiePrefs);
      if (this.validPrivacyCookieFlag) {
        // If privacy cookie is valid (parsable),
        // then read values from each bitwise field
        try {
          if (cookiePrefs[0] === '1') {
            this.necessaryCookies = true;
          }
          if (cookiePrefs[1] === '1') {
            this.performanceAnalyticsCookies = true;
          }
          if (cookiePrefs[2] === '1') {
            this.personalizationCookies = true;
          }
          if (cookiePrefs[3] === '1') {
            this.targetingCookies = true;
          }
          if (cookiePrefs[4] === '1') {
            this.ccpaConsentCookies = true;
          }
        // eslint-disable-next-line no-empty
        } catch (e) {
        }
      } else { 
        // Default if there's no privacy cookie / not valid: track everything
        this.necessaryCookies = true;
        this.performanceAnalyticsCookies = true;
        this.personalizationCookies = true;
        this.targetingCookies = true;
        this.ccpaConsentCookies = true;
      }
    }
  }

  get isValidPrivacyCookie () {
    return this.validPrivacyCookieFlag;
  }

  get isCCPAConsentAllowed () {
    return this.ccpaConsentCookies;
  }

  get isOptInAnswered () {
    return this.optInAnswered;
  }

  get isNecessaryAllowed () {
    return this.necessaryCookies;
  }

  get isAnalyticsAllowed () {
    return this.performanceAnalyticsCookies;
  }

  get isTargetingAllowed () {
    return this.targetingCookies;
  }

  get isPersonalizationAllowed () {
    return this.personalizationCookies;
  }
}

export function getPrivacyState (window) {
  return new PrivacyState(window);
}

export function verifyAnalyticsAllowed (privacyObj) {
  return privacyObj.isAnalyticsAllowed;
}

export function setupPrivacyClickMonitor(
  window,
  log,
  doWhenAnalyticsIsAllowed,
) {
  window.addEventListener('mousedown', () => {
    if (!window[ALREADY_CHECKED_PRIVACY_STATE]) {
      setTimeout(() => {
        if (verifyAnalyticsAllowed(getPrivacyState(window))) {
          log.info(
            'Click Detected privacy state: analytics allowed, loading Launch',
          );
          doWhenAnalyticsIsAllowed();
        }
      }, 200); // Wait 200 ms before evaluating if privacy state has changed
    }
  });
}
