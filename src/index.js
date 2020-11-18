import React from 'react';
import PropTypes from 'prop-types';
import set from 'dset';

const DidomiSDK = ({
  apiKey: apiKeyProp = null,
  iabVersion = 2,
  noticeId = null,
  config = {},
  gdprAppliesGlobally: gdprAppliesGloballyProp = true,
  onReady,
  onConsentChanged,
  onNoticeShown,
  onNoticeHidden,
  onNoticeBackdropclick,
  onNoticeClickAgree,
  onNoticeClickMoreInfo,
  onPreferencesClickAgreeToAll,
  onPreferencesClickDisagreeToAll,
  onPreferencesClickPurposeAgree,
  onPreferencesClickPurposeDisagree,
  onPreferencesClickViewVendors,
  onPreferencesClickSaveChoices,
  onPreferencesClickVendorAgree,
  onPreferencesClickVendorDisagree,
  onPreferencesClickVendorSaveChoices,
  sdkPath = 'https://sdk.privacy-center.org/',
  embedTCFStub = true,
}) => {
  /**
   * Set all the Didomi event listeners from the props
   */
  const setEvents = () => {
    if (onReady) {
      window.didomiOnReady = window.didomiOnReady || [];
      window.didomiOnReady.push(onReady);
    }

    window.didomiEventListeners = window.didomiEventListeners || [];

    if (onConsentChanged) {
      window.didomiEventListeners.push({
        event: 'consent.changed',
        listener: (e) => {
          onConsentChanged(e.consentToken);
        },
      });
    }

    if (onNoticeShown) {
      window.didomiEventListeners.push({
        event: 'notice.shown',
        listener: () => onNoticeShown(),
      });
    }

    if (onNoticeHidden) {
      window.didomiEventListeners.push({
        event: 'notice.hidden',
        listener: () => onNoticeHidden(),
      });
    }

    if (onNoticeBackdropclick) {
      window.didomiEventListeners.push({
        event: 'notice.backdropclick',
        listener: () => onNoticeBackdropclick(),
      });
    }

    if (onNoticeClickAgree) {
      window.didomiEventListeners.push({
        event: 'notice.clickagree',
        listener: () => onNoticeClickAgree(),
      });
    }

    if (onNoticeClickMoreInfo) {
      window.didomiEventListeners.push({
        event: 'notice.clickmoreinfo',
        listener: () => onNoticeClickMoreInfo(),
      });
    }

    if (onPreferencesClickAgreeToAll) {
      window.didomiEventListeners.push({
        event: 'preferences.clickagreetoall',
        listener: () => onPreferencesClickAgreeToAll(),
      });
    }

    if (onPreferencesClickDisagreeToAll) {
      window.didomiEventListeners.push({
        event: 'preferences.clickdisagreetoall',
        listener: () => onPreferencesClickDisagreeToAll(),
      });
    }

    if (onPreferencesClickPurposeAgree) {
      window.didomiEventListeners.push({
        event: 'preferences.clickpurposeagree',
        listener: () => onPreferencesClickPurposeAgree(),
      });
    }

    if (onPreferencesClickPurposeDisagree) {
      window.didomiEventListeners.push({
        event: 'preferences.clickpurposedisagree',
        listener: () => onPreferencesClickPurposeDisagree(),
      });
    }

    if (onPreferencesClickViewVendors) {
      window.didomiEventListeners.push({
        event: 'preferences.clickviewvendors',
        listener: () => onPreferencesClickViewVendors(),
      });
    }

    if (onPreferencesClickSaveChoices) {
      window.didomiEventListeners.push({
        event: 'preferences.clicksavechoices',
        listener: () => onPreferencesClickSaveChoices(),
      });
    }

    if (onPreferencesClickVendorAgree) {
      window.didomiEventListeners.push({
        event: 'preferences.clickvendoragree',
        listener: () => onPreferencesClickVendorAgree(),
      });
    }

    if (onPreferencesClickVendorDisagree) {
      window.didomiEventListeners.push({
        event: 'preferences.clickvendordisagree',
        listener: () => onPreferencesClickVendorDisagree(),
      });
    }

    if (onPreferencesClickVendorSaveChoices) {
      window.didomiEventListeners.push({
        event: 'preferences.clickvendorsavechoices',
        listener: () => onPreferencesClickVendorSaveChoices(),
      });
    }
  };

  /**
   * Get the API Key from the props or from the config if it exists
   */
  const getApiKey = () => {
    let apiKey;
    if (config.app && config.app.apiKey) {
      apiKey = config.app.apiKey;
    }
    return apiKeyProp || apiKey;
  };

  /**
   * Initialize the SDK, set the config object and insert the loader.js into the DOM
   */
  const init = () => {
    let loaderParams;
    let apiKey = getApiKey();
    let gdprAppliesGlobally = gdprAppliesGloballyProp === false ? false : true;
    window.didomiConfig = config || {};

    // Set the SDK path
    window.didomiConfig.sdkPath = sdkPath;

    // Embed the Didomi SDK on the page
    window.gdprAppliesGlobally = gdprAppliesGlobally;
    if (noticeId) {
      loaderParams = `target_type=notice&target=${noticeId}`;
    } else {
      loaderParams = `target=${document.location.hostname}`;
    }

    // Embed the TCF stub
    if (embedTCFStub) {
      if (iabVersion === 2) {
        // TCF v2
        // prettier-ignore
        (function(){function a(e){if(!window.frames[e]){if(document.body&&document.body.firstChild){var t=document.body;var n=document.createElement("iframe");n.style.display="none";n.name=e;n.title=e;t.insertBefore(n,t.firstChild)}else{setTimeout(function(){a(e)},5)}}}function e(n,r,o,c,s){function e(e,t,n,a){if(typeof n!=="function"){return}if(!window[r]){window[r]=[]}var i=false;if(s){i=s(e,t,n)}if(!i){window[r].push({command:e,parameter:t,callback:n,version:a})}}e.stub=true;function t(a){if(!window[n]||window[n].stub!==true){return}if(!a.data){return}var i=typeof a.data==="string";var e;try{e=i?JSON.parse(a.data):a.data}catch(t){return}if(e[o]){var r=e[o];window[n](r.command,r.parameter,function(e,t){var n={};n[c]={returnValue:e,success:t,callId:r.callId};a.source.postMessage(i?JSON.stringify(n):n,"*")},r.version)}}if(typeof window[n]!=="function"){window[n]=e;if(window.addEventListener){window.addEventListener("message",t,false)}else{window.attachEvent("onmessage",t)}}}e("__tcfapi","__tcfapiBuffer","__tcfapiCall","__tcfapiReturn");a("__tcfapiLocator");})();
      } else {
        // TCF v1
        // prettier-ignore
        (function(){function r(){if(!window.frames.__cmpLocator){if(document.body&&document.body.firstChild){var e=document.body;var t=document.createElement("iframe");t.style.display="none";t.name="__cmpLocator";t.title="cmpLocator";e.insertBefore(t,e.firstChild)}else{setTimeout(r,5)}}}function e(e,t,r){if(typeof r!=="function"){return}if(!window.__cmpBuffer){window.__cmpBuffer=[]}if(e==="ping"){r({gdprAppliesGlobally:window.gdprAppliesGlobally,cmpLoaded:false},true)}else{window.__cmpBuffer.push({command:e,parameter:t,callback:r})}}e.stub=true;function t(a){if(!window.__cmp||window.__cmp.stub!==true){return}if(!a.data){return}var n=typeof a.data==="string";var e;try{e=n?JSON.parse(a.data):a.data}catch(t){return}if(e.__cmpCall){var o=e.__cmpCall;window.__cmp(o.command,o.parameter,function(e,t){var r={__cmpReturn:{returnValue:e,success:t,callId:o.callId}};a.source.postMessage(n?JSON.stringify(r):r,"*")})}}if(typeof window.__cmp!=="function"){window.__cmp=e;if(window.addEventListener){window.addEventListener("message",t,false)}else{window.attachEvent("onmessage",t)}}r()})();
      }
    }

    // Embed the SDK
    const loaderScript = document.createElement('script');
    loaderScript.id = 'spcloader';
    loaderScript.type = 'text/javascript';
    loaderScript.async = true;
    loaderScript.src = sdkPath + apiKey + '/loader.js?' + loaderParams;
    loaderScript.charset = 'utf-8';

    const firstScriptTagInDocument = document.getElementsByTagName('script')[0];
    firstScriptTagInDocument.parentNode.insertBefore(
      loaderScript,
      firstScriptTagInDocument,
    );
  };

  React.useEffect(() => {
    setEvents();
    init();
  }, []);

  return null;
};

DidomiSDK.propTypes = {
  apiKey: PropTypes.string,
  iabVersion: PropTypes.number,
  noticeId: PropTypes.string,
  config: PropTypes.object,
  gdprAppliesGlobally: PropTypes.bool,
  onReady: PropTypes.func,
  onConsentChanged: PropTypes.func,
  onNoticeShown: PropTypes.func,
  onNoticeHidden: PropTypes.func,
  onNoticeBackdropclick: PropTypes.func,
  onNoticeClickAgree: PropTypes.func,
  onNoticeClickMoreInfo: PropTypes.func,
  onPreferencesClickAgreeToAll: PropTypes.func,
  onPreferencesClickDisagreeToAll: PropTypes.func,
  onPreferencesClickPurposeAgree: PropTypes.func,
  onPreferencesClickPurposeDisagree: PropTypes.func,
  onPreferencesClickViewVendors: PropTypes.func,
  onPreferencesClickSaveChoices: PropTypes.func,
  onPreferencesClickVendorAgree: PropTypes.func,
  onPreferencesClickVendorDisagree: PropTypes.func,
  onPreferencesClickVendorSaveChoices: PropTypes.func,
  sdkPath: PropTypes.string,
  embedTCFStub: PropTypes.bool,
};

export { DidomiSDK };
