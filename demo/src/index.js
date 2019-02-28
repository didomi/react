import React, { Component } from 'react'
import { render } from 'react-dom'

import { DidomiSDK } from '../../src'

class NoticeHTML extends Component {
  openPreferences() {
    Didomi.preferences.show();
  }

  render() {
    const noticeStyle = {
      color: 'red'
    }

    return (
      <div style={noticeStyle}>
        <span>Custom Notice HTML. <a onClick={this.openPreferences.bind(this)}>Open Preferences</a></span>
        {
          this.props.shouldDisplayMoreText &&
          <p>More Text</p>
        }
      </div>
    )
  }
}


const NoticeHTMLFunc = () => {
  return (
    <div>Test de HTML Func</div>
  )
}


class DidomiDemo extends Component {

  constructor(props) {
    super(props);
    this.didomiObject = {};

    window.didomiCountry = 'FR';

    /**
     * This is the configuration object that will set the Didomi SDK
     */
    this.didomiConfig = {  
      website: {
        name: 'Didomi',
        apiKey: 'API_KEY',
        vendors: {
          iab: {
            all: true
          }
        }
      },
      notice: {
        position: 'popup',
        content: {
          html: {
            fr: element => {
              render(<NoticeHTML shouldDisplayMoreText={false} />, element);
            },
            // en: element => {
            //   render(<NoticeHTMLFunc />, element);
            // },
            en: "TEST STRING"
          },
          dismiss: {
              en: 'I agree',
              fr: 'J\'accepte Custom'
          },
        }
      },
      languages: {
        enabled: ['fr', 'en', 'es'],
        default: 'fr'
      }
    }

  }

  /**
   * Called once we have the callback from the SDK informing that Didoni is loaded and ready
   */
  onDidomiReady(didomi) {
    this.didomiObject = didomi;

    console.log('Didomi Ready - Is the consent required ? : ', this.didomiObject.isConsentRequired());
    console.log('Didomi Ready - Do we have the consent for the vendor IAB 1 : ', this.didomiObject.getUserConsentStatusForVendor(1));
    console.log('Didomi Ready - Do we have the consent for the vendor IAB 1 and the purpose cookies : ', this.didomiObject.getUserConsentStatus('cookies', 1));

  }

  /**
   * Called everytime the consent changes
   */
  consentHasChanged(cwtToken) {
    console.log('Didomi Consent Changed - cwtToken : ', cwtToken);
    console.log('Didomi Consent Changed - Is the consent required ? : ', this.didomiObject.isConsentRequired());
    console.log('Didomi Consent Changed - Do we have the consent for the vendor IAB 1 : ', this.didomiObject.getUserConsentStatusForVendor(1));
    console.log('Didomi Consent Changed - Do we have the consent for the vendor IAB 1 and the purpose cookies : ', this.didomiObject.getUserConsentStatus('cookies', 1));
  }

  render() {


    return <div>
      <h1>Didomi React Demo</h1>
      <DidomiSDK
        config={this.didomiConfig}
        gdprAppliesGlobally={true}
        onReady={this.onDidomiReady.bind(this)}
        onConsentChanged={this.consentHasChanged.bind(this)}
      />
      <button onClick={() => this.didomiObject.setUserAgreeToAll()}>Set Agree to All</button>
    </div>
  }
}

render(<DidomiDemo/>, document.querySelector('#demo'))
