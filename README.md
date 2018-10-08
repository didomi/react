
# Didomi React

[![Didomi](https://www.didomi.io/static/assets/logo.png)](https://didomi.io)

Didomi React is a React component which creates a layer on top of our SDK.

### Using the component

1. Install the library using npm.

```sh
$ npm install --save didomi-react
```
2. Import the module in your app.

```js
import { DidomiSDK } from 'didomi-react';
  ```
   
Please note that the sooner you instanciate the component, the faster the banner will be displayed or the faster the consents will be shared with your partners and the ads displayed.

3. Instanciate the component in your app
```jsx
const didomiConfig = {  
  website: {
    vendors: {
      iab: {
      all: true
      }
    }
  }
}
    
...
    
<DidomiSDK
  config={didomiConfig}
  onReady={didomi => console.log('Didomi SDK is loaded and ready', didomi)}
  onConsentChanged={cwtToken => console.log('A consent has been given/withdrawn', cwtToken)}
  onNoticeShown={() => console.log('Didomi Notice Shown')}
  onNoticeHidden={() => console.log('Didomi Notice Hidden')}
/>
  ```


### Column Props

<table>
  <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 50px;">Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>config</td>
      <td>object</td>
      <td>{}</td>
      <td>Configuration of the SDK, please go below to see the configuration object structure</td>
    </tr>
    <tr>
      <td>onReady</td>
      <td>function</td>
      <td></td>
      <td>Called when the SDK is loaded. Pass the Didomi object as parameter. Please see the https://developers.didomi.io/cmp/web-sdk/reference for more information about what you can do with the Didomi object</td>
    </tr>
    <tr>
      <td>onConsentChanged</td>
      <td>function</td>
      <td></td>
      <td>Called when a consent is given or withdrawn by the user. Pass the CWT Token as parameter.</td>
    </tr>
       <tr>
      <td>onNoticeShown</td>
      <td>function</td>
      <td></td>
      <td>Called when the notice is shown</td>
    </tr>
        <tr>
      <td>onNoticeHidden</td>
      <td>function</td>
      <td></td>
      <td>Called when the notice is hidden</td>
    </tr>
  </tbody>
</table>


### Configuration object

This is the structure of the configuration object. For more information, please visit our [SDK documentation](https://developers.didomi.io/cmp/web-sdk/getting-started)

```js
{
  website: {
    ignoreCountry: true,
    privacyPolicyURL: 'http://example.com',
    name: 'Example',
    apiKey: '<Your API key>',
    logoUrl: 'http://logo.png',
    vendors: {
      iab: { // You either choose the option 'all', with optionally 'exclude', or the 'include' option where you add the vendors manually
        all: true,
        exclude: [1],
        // OR
        include: [3],
      },
      didomi: ['google'],
      custom: [
        {
          id: 'custom-vendor', // Unique ID for the vendor
          name: 'Custom Vendor', // Display name of the vendor
          purposeIds: ['cookies'], // List of purposes that you want to collect consent for, for this vendor
          policyUrl: 'http://www.vendor.com/privacy-policy' // URL to the privacy policy of the vendor
        }
      ]
    },
    customPurposes: [
      {
        id: 'my_custom_purpose',
        name: {
          en: 'My custom purpose',
        },
        description: {
          en: 'Description',
        }
      }
    ]
  },
  languages: {
    enabled: ['en', 'fr', 'es', 'nl', 'ca', 'it', 'de', 'pt'], // List of languages that visitors can use
    default: 'fr', // Default language to use if the visitor uses a language that is not enabled
  },
  notice: {
    position: 'popup',
    closeOnClick: true,
    content: {
      popup: {
        en: 'Text',
      },
      notice: {
        en: 'Text',
      },
      dismiss: {
        en: 'Text',
      },
      learnMore: {
        en: 'Text',
      }
    }
  },
  preferences: {
    defaultChoice: true,
    content: {
      text: {
        en: 'Text',
      },
      title: {
        en: 'Text',
      },
      disagreeToAll: {
        en: 'Text',
      },
      agreeToAll: {
        en: 'Text',
      },
      save: {
        en: 'Text',
      },
      textVendors: {
        en: 'Text'
      },
      subTextVendors: {
        en: 'Text'
      }
    },
    information: {
      enable: true,
      content: {
        text: {
          en: 'Text',
        },
        learnMore: {
          en: 'Text',
        },
        agreeAndClose: {
          en: 'Text',
        }
      }
    }
  },
  theme: {
    color: '#3F51B5', // Principal color used by the SDK
    font: 'Arial', // Font used by the SDK
    buttons: {
      regularButtons: { // Learn more/disagree/disagree to all buttons.
        backgroundColor: '#eeeeee',
        textColor: '#999999',
        borderColor: 'rgba(34, 34, 34, 0.2)',
        borderWidth: '1px',
        borderRadius: '0px',
      },
      highlightButtons: { // Agree/save/agree to all buttons.
        backgroundColor: 'rgb(194, 39, 45)',
        textColor: '#ffffff',
        borderColor: 'rgba(194, 39, 45, 0.3)',
        borderWidth: '1px',
        borderRadius: '0px',
      }
    }
  },
  tagManager: {
    provider: 'gtm'
  },
  integrations: {
    vendors: { // Setup the integration with Google (ask Didomi to share consent with Google tags)
      google: {
        enable: true,
        eprivacy: true
      }
    },
    refreshOnConsent: true // by default, ads are reloaded after consent is given
  }
  ```


### Example of implementation

```jsx
import React, { Component } from 'react'

import { DidomiSDK } from 'didomi-react'

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
        config={didomiConfig}
        onReady={this.onDidomiReady.bind(this)}
        onConsentChanged={this.consentHasChanged.bind(this)}
      />
      <button onClick={() => this.didomiObject.setUserAgreeToAll()}>Set Agree to All</button>
    </div>
  }
}
  ```
  
  
### Didomi SDK Documentation

See [Documentation](https://developers.didomi.io/cmp/web-sdk)


### License

MIT