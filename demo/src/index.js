import React, { Component } from 'react'
import { render } from 'react-dom'

import { DidomiSDK } from '../../src'

/**
 * This is the configuration object that will set the Didomi SDK
 */
const didomiConfig = {  
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
    position: 'bottom'
  },
  languages: {
    enabled: ['fr', 'en', 'es'],
    default: 'fr'
  }
}


class DidomiDemo extends Component {

  constructor(props) {
    super(props);
    this.didomiObject = {};
  }

  onDidomiReady(didomi) {
    this.didomiObject = didomi;

    console.log('Didomi Ready - Is the consent required ? : ', this.didomiObject.isConsentRequired());
    console.log('Didomi Ready - Do we have the consent for the vendor IAB 1 : ', this.didomiObject.getUserConsentStatusForVendor(1));
    console.log('Didomi Ready - Do we have the consent for the vendor IAB 1 and the purpose cookies : ', this.didomiObject.getUserConsentStatus('cookies', 1));

  }

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
        config={didomiConfig}
        onReady={this.onDidomiReady.bind(this)}
        onConsentChanged={this.consentHasChanged.bind(this)}
      />
      <button onClick={() => this.didomiObject.setUserAgreeToAll()}>Set Agree to All</button>
    </div>
  }
}

render(<DidomiDemo/>, document.querySelector('#demo'))
