import React from 'react';
import PropTypes from 'prop-types';

const DidomiSDK = ({
  apiKey: apiKeyProp = null,
  noticeId = null,
  platform = null,
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
  embedGPPStub = false,
  country = null,
  region = null,
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
      if (platform) {
        loaderParams = `platform=${platform}&${loaderParams}`;
      }
    } else {
      loaderParams = `target=${document.location.hostname}`;
    }

    // Append country and region to loader params if provided
    // This allows the server to determine the correct response based on user geolocation
    if (country) {
      loaderParams = `${loaderParams}&country=${country}`;
    }
    if (region) {
      loaderParams = `${loaderParams}&region=${region}`;
    }

    // Embed the TCF stub
    if (embedTCFStub) {
      // TCF v2
      // prettier-ignore
      (function(){function a(e){if(!window.frames[e]){if(document.body&&document.body.firstChild){var t=document.body;var n=document.createElement("iframe");n.style.display="none";n.name=e;n.title=e;n.setAttribute("aria-hidden","true");n.tabIndex=-1;t.insertBefore(n,t.firstChild);try{n.contentDocument.documentElement.setAttribute("aria-hidden","true")}catch(t){}}else{setTimeout(function(){a(e)},5)}}}function e(n,r,o,c,s){function e(e,t,n,a){if(typeof n!=="function"){return}if(!window[r]){window[r]=[]}var i=false;if(s){i=s(e,t,n)}if(!i){window[r].push({command:e,parameter:t,callback:n,version:a})}}e.stub=true;function t(a){if(!window[n]||window[n].stub!==true){return}if(!a.data){return}var i=typeof a.data==="string";var e;try{e=i?JSON.parse(a.data):a.data}catch(t){return}if(e[o]){var r=e[o];window[n](r.command,r.parameter,function(e,t){var n={};n[c]={returnValue:e,success:t,callId:r.callId};a.source.postMessage(i?JSON.stringify(n):n,"*")},r.version)}}if(typeof window[n]!=="function"){window[n]=e;if(window.addEventListener){window.addEventListener("message",t,false)}else{window.attachEvent("onmessage",t)}}}e("__tcfapi","__tcfapiBuffer","__tcfapiCall","__tcfapiReturn");a("__tcfapiLocator");})();
    }

    // Embed the GPP stub
    if (embedGPPStub) {
      // GPP CMP API v1.1
      // prettier-ignore
      (function(){window.__gpp_addFrame=function(e){if(!window.frames[e])if(document.body){var t=document.createElement("iframe");t.style.cssText="display:none",t.name=e,t.setAttribute("aria-hidden","true"),t.tabIndex=-1,document.body.appendChild(t);try{t.contentDocument.documentElement.setAttribute("aria-hidden","true")}catch(e){}}else window.setTimeout(function(){window.__gpp_addFrame&&window.__gpp_addFrame(e)},10)};window.__gpp_stub=function(){var e=arguments;if(window.__gpp.queue=window.__gpp.queue||[],window.__gpp.events=window.__gpp.events||[],!e.length||1==e.length&&"queue"==e[0])return window.__gpp.queue;if(1==e.length&&"events"==e[0])return window.__gpp.events;var t=e[0],p=e.length>1?e[1]:null,s=e.length>2?e[2]:null;if("ping"===t)p({gppVersion:"1.1",cmpStatus:"stub",cmpDisplayStatus:"hidden",signalStatus:"not ready",supportedAPIs:["2:tcfeuv2","5:tcfcav1","6:uspv1","7:usnatv1","8:uscav1","9:usvav1","10:uscov1","11:usutv1","12:usctv1"],cmpId:0,sectionList:[],applicableSections:[],gppString:"",parsedSections:{}},!0);else if("addEventListener"===t){"lastId"in window.__gpp||(window.__gpp.lastId=0),window.__gpp.lastId++;var n=window.__gpp.lastId;window.__gpp.events.push({id:n,callback:p,parameter:s}),p({eventName:"listenerRegistered",listenerId:n,data:!0,pingData:{gppVersion:"1.1",cmpStatus:"stub",cmpDisplayStatus:"hidden",signalStatus:"not ready",supportedAPIs:["2:tcfeuv2","5:tcfcav1","6:uspv1","7:usnatv1","8:uscav1","9:usvav1","10:uscov1","11:usutv1","12:usctv1"],cmpId:0,sectionList:[],applicableSections:[],gppString:"",parsedSections:{}}},!0)}else if("removeEventListener"===t){for(var a=!1,i=0;i<window.__gpp.events.length;i++)if(window.__gpp.events[i].id==s){window.__gpp.events.splice(i,1),a=!0;break}p({eventName:"listenerRemoved",listenerId:s,data:a,pingData:{gppVersion:"1.1",cmpStatus:"stub",cmpDisplayStatus:"hidden",signalStatus:"not ready",supportedAPIs:["2:tcfeuv2","5:tcfcav1","6:uspv1","7:usnatv1","8:uscav1","9:usvav1","10:uscov1","11:usutv1","12:usctv1"],cmpId:0,sectionList:[],applicableSections:[],gppString:"",parsedSections:{}}},!0)}else"hasSection"===t?p(!1,!0):"getSection"===t||"getField"===t?p(null,!0):window.__gpp.queue.push([].slice.apply(e))};window.__gpp_msghandler=function(e){var t="string"==typeof e.data;try{var p=t?JSON.parse(e.data):e.data}catch(e){p=null}if("object"==typeof p&&null!==p&&"__gppCall"in p){var s=p.__gppCall;window.__gpp&&window.__gpp(s.command,function(p,n){var a={__gppReturn:{returnValue:p,success:n,callId:s.callId}};e.source.postMessage(t?JSON.stringify(a):a,"*")},"parameter"in s?s.parameter:null,"version"in s?s.version:"1.1")}};if(!("__gpp"in window)||"function"!=typeof window.__gpp){window.__gpp=window.__gpp_stub;window.addEventListener("message",window.__gpp_msghandler,!1);window.__gpp_addFrame("__gppLocator")}})();
    }

    const spcloaderId = 'spcloader';
    const spcloaderScript = document.getElementById(spcloaderId);

    // Didomi is already loaded, no need to add the script again
    if (spcloaderScript) {
      return null;
    }

    // Embed the SDK
    const loaderScript = document.createElement('script');
    loaderScript.id = spcloaderId;
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
  noticeId: PropTypes.string,
  platform: PropTypes.string,
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
  embedGPPStub: PropTypes.bool,
  country: PropTypes.string,
  region: PropTypes.string,
};

export { DidomiSDK };
