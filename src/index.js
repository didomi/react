import { Component } from 'react';
import PropTypes from 'prop-types';

class DidomiSDK extends Component {
  static propTypes = {
    apiKey: PropTypes.string,
    iabVersion: PropTypes.number,
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
    onPreferencesClickVendorSaveChoices: PropTypes.func
  }

  static defaultProps = {
    apiKey: null,
    iabVersion: 1,
    config: {},
    gdprAppliesGlobally: true,
    onReady: () => {},
    onConsentChanged: () => {},
    onNoticeShown: () => {},
    onNoticeHidden: () => {},
    onNoticeBackdropclick: () => {},
    onNoticeClickAgree: () => {},
    onNoticeClickMoreInfo: () => {},
    onPreferencesClickAgreeToAll: () => {},
    onPreferencesClickDisagreeToAll: () => {},
    onPreferencesClickPurposeAgree: () => {},
    onPreferencesClickPurposeDisagree: () => {},
    onPreferencesClickViewVendors: () => {},
    onPreferencesClickSaveChoices: () => {},
    onPreferencesClickVendorAgree: () => {},
    onPreferencesClickVendorDisagree: () => {},
    onPreferencesClickVendorSaveChoices: () => {}
  }

  /**
   * Called once the Didomi SDK is ready and loaded
   * @param {*} Didomi
   */
  didomiOnReady(Didomi) {
    this.props.onReady(Didomi)
    this.setEvents(Didomi);
  }

  /**
   * Set all the Didomi events the return the callbacks from the props
   * @param {*} Didomi
   */
  setEvents(Didomi) {
    if(this.props.onConsentChanged) {
      Didomi.on('consent.changed', e => {
        this.props.onConsentChanged(e.consentToken)
      })
    }

    if(this.props.onNoticeShown) {
      Didomi.on('notice.shown', e => {
        this.props.onNoticeShown()
      })
    }

    if(this.props.onNoticeHidden) {
      Didomi.on('notice.hidden', e => {
        this.props.onNoticeHidden()
      })
    }

    if(this.props.onNoticeBackdropclick) {
      Didomi.on('notice.backdropclick', e => {
        this.props.onNoticeBackdropclick()
      })
    }

    if(this.props.onNoticeClickAgree) {
      Didomi.on('notice.clickagree', e => {
        this.props.onNoticeClickAgree()
      })
    }

    if(this.props.onNoticeClickMoreInfo) {
      Didomi.on('notice.clickmoreinfo', e => {
        this.props.onNoticeClickMoreInfo()
      })
    }

    if(this.props.onPreferencesClickAgreeToAll) {
      Didomi.on('preferences.clickagreetoall', e => {
        this.props.onPreferencesClickAgreeToAll()
      })
    }

    if(this.props.onPreferencesClickDisagreeToAll) {
      Didomi.on('preferences.clickdisagreetoall', e => {
        this.props.onPreferencesClickDisagreeToAll()
      })
    }
    if(this.props.onPreferencesClickPurposeAgree) {
      Didomi.on('preferences.clickpurposeagree', e => {
        this.props.onPreferencesClickPurposeAgree(e.purposeId)
      })
    }

    if(this.props.onPreferencesClickPurposeDisagree) {
      Didomi.on('preferences.clickpurposedisagree', e => {
        this.props.onPreferencesClickPurposeDisagree(e.purposeId)
      })
    }

    if(this.props.onPreferencesClickViewVendors) {
      Didomi.on('preferences.clickviewvendors', e => {
        this.props.onPreferencesClickViewVendors()
      })
    }

    if(this.props.onPreferencesClickSaveChoices) {
      Didomi.on('preferences.clicksavechoices', e => {
        this.props.onPreferencesClickSaveChoices()
      })
    }

    if(this.props.onPreferencesClickVendorAgree) {
      Didomi.on('preferences.clickvendoragree', e => {
        this.props.onPreferencesClickVendorAgree(e.vendorId)
      })
    }

    if(this.props.onPreferencesClickVendorDisagree) {
      Didomi.on('preferences.clickvendordisagree', e => {
        this.props.onPreferencesClickVendorDisagree(e.vendorId)
      })
    }

    if(this.props.onPreferencesClickVendorSaveChoices) {
      Didomi.on('preferences.clickvendorsavechoices', e => {
        this.props.onPreferencesClickVendorSaveChoices()
      })
    }
  }

  /**
   * Initialize the SDK, set the config object and insert the loader.js into the DOM
   */
  init() {
    let gdprAppliesGlobally = this.props.gdprAppliesGlobally === false ? false : true;
    window.didomiConfig = this.props.config || {};

    // Embed the Didomi SDK on the page
    window.gdprAppliesGlobally=gdprAppliesGlobally;
    if(this.props.iabVersion === 2) {
      // TCF v2
      (function(){function a(e){if(!window.frames[e]){if(document.body&&document.body.firstChild){var t=document.body;var n=document.createElement("iframe");n.style.display="none";n.name=e;n.title=e;t.insertBefore(n,t.firstChild)}else{setTimeout(function(){a(e)},5)}}}function e(n,r,o,c,s){function e(e,t,n,a){if(typeof n!=="function"){return}if(!window[r]){window[r]=[]}var i=false;if(s){i=s(e,t,n)}if(!i){window[r].push({command:e,parameter:t,callback:n,version:a})}}e.stub=true;function t(a){if(!window[n]||window[n].stub!==true){return}if(!a.data){return}var i=typeof a.data==="string";var e;try{e=i?JSON.parse(a.data):a.data}catch(t){return}if(e[o]){var r=e[o];window[n](r.command,r.parameter,function(e,t){var n={};n[c]={returnValue:e,success:t,callId:r.callId};a.source.postMessage(i?JSON.stringify(n):n,"*")},r.version)}}if(typeof window[n]!=="function"){window[n]=e;if(window.addEventListener){window.addEventListener("message",t,false)}else{window.attachEvent("onmessage",t)}}}e("__tcfapi","__tcfapiBuffer","__tcfapiCall","__tcfapiReturn");a("__tcfapiLocator");(function(e){var t=document.createElement("script");t.id="spcloader";t.type="text/javascript";t.async=true;t.src="https://sdk.privacy-center.org/"+e+"/loader.js?target="+document.location.hostname;t.charset="utf-8";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n)})(this.props.apiKey)})();
    } else {
      // TCF v1
      (function(){function r(){if(!window.frames.__cmpLocator){if(document.body&&document.body.firstChild){var e=document.body;var t=document.createElement("iframe");t.style.display="none";t.name="__cmpLocator";t.title="cmpLocator";e.insertBefore(t,e.firstChild)}else{setTimeout(r,5)}}}function e(e,t,r){if(typeof r!=="function"){return}if(!window.__cmpBuffer){window.__cmpBuffer=[]}if(e==="ping"){r({gdprAppliesGlobally:window.gdprAppliesGlobally,cmpLoaded:false},true)}else{window.__cmpBuffer.push({command:e,parameter:t,callback:r})}}e.stub=true;function t(a){if(!window.__cmp||window.__cmp.stub!==true){return}if(!a.data){return}var n=typeof a.data==="string";var e;try{e=n?JSON.parse(a.data):a.data}catch(t){return}if(e.__cmpCall){var o=e.__cmpCall;window.__cmp(o.command,o.parameter,function(e,t){var r={__cmpReturn:{returnValue:e,success:t,callId:o.callId}};a.source.postMessage(n?JSON.stringify(r):r,"*")})}}if(typeof window.__cmp!=="function"){window.__cmp=e;if(window.addEventListener){window.addEventListener("message",t,false)}else{window.attachEvent("onmessage",t)}}r()})();(function(e){var t=e?e+"/":"";var r=document.createElement("script");r.id="spcloader";r.type="text/javascript";r.async=true;r.src="https://sdk.privacy-center.org/"+t+"loader.js?target="+document.location.hostname;r.charset="utf-8";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a)})(this.props.apiKey);
    }
  }

  componentDidMount() {
    this.init();

    if(this.props.onReady) {
      window.didomiOnReady = window.didomiOnReady || [];
      window.didomiOnReady.push(this.didomiOnReady.bind(this));
    }
  }

  render() {
    return null;
  }
};

export { DidomiSDK }
