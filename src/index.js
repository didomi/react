import { Component } from 'react';
import PropTypes from 'prop-types';

class DidomiSDK extends Component {

  static propTypes = {
    config: PropTypes.object,
    gdprAppliesGlobally: PropTypes.bool,
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
    config: {},
    gdprAppliesGlobally: true,
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

    window.gdprAppliesGlobally=gdprAppliesGlobally;(function(){function a(){if(!window.frames.__cmpLocator){if(document.body&&document.body.firstChild){var e=document.body;var n=document.createElement("iframe");n.style.display="none";n.name="__cmpLocator";e.insertBefore(n,e.firstChild)}else{setTimeout(a,5)}}}function e(e,n,a){if(typeof a!=="function"){return}if(!window.__cmpBuffer){window.__cmpBuffer=[]}if(e==="ping"){a({gdprAppliesGlobally:window.gdprAppliesGlobally,cmpLoaded:false},true)}else{window.__cmpBuffer.push({command:e,parameter:n,callback:a})}}e.stub=true;function n(t){if(!window.__cmp||window.__cmp.stub!==true){return}if(!t.data){return}var i=typeof t.data==="string";var e=i?JSON.parse(t.data):t.data;if(e.__cmpCall){var o=e.__cmpCall;window.__cmp(o.command,o.parameter,function(e,n){var a={__cmpReturn:{returnValue:e,success:n,callId:o.callId}};t.source.postMessage(i?JSON.stringify(a):a,"*")})}}if(typeof window.__cmp!=="function"){window.__cmp=e;if(window.addEventListener){window.addEventListener("message",n,false)}else{window.attachEvent("onmessage",n)}}a()})();

    window.didomiConfig = this.props.config || {};

    const script = document.createElement("script");
    // script.src = process.env.__REACT_APP_LOADER_URL__;
    script.src = 'https://sdk.privacy-center.org/loader.js';
    script.async = true;
    script.id = "spcloader";

    document.head.appendChild(script);
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