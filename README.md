
# Didomi React

[![Didomi](https://www.didomi.io/static/assets/logo.png)](https://didomi.io)

Didomi React is a React component which creates a layer on top of our SDK.

## Install the component

1. Install the library using npm.

```sh
$ npm install --save @didomi/react
```
2. Import the module in your app.

```js
import { DidomiSDK } from '@didomi/react';
```

We recommend instantiating the `DidomiSDK` component as early as possible in your React application.    
The sooner you instantiate the component, the faster the banner will be displayed or the faster the consents will be shared with your partners and the ads displayed.

## Create the DidomiSDK component

### Instantiate the component with the configuration coming from the Didomi Console (recommended)

1. Create and configure your consent notice in the Console : https://console.didomi.io

2. Instantiate the component in your app
```jsx
<DidomiSDK
  apiKey="API_KEY"
  iabVersion={1} // If you want to support the TCF v2, don't forget to change this value, even if you selected the TCF v2 in the console. This parameter will load the correct stub in the React Component
  noticeId="NOTICE_ID" // If you want to target the notice by ID and not by domain
  gdprAppliesGlobally={true}
  onReady={didomi => console.log('Didomi SDK is loaded and ready', didomi)}
  onConsentChanged={cwtToken => console.log('A consent has been given/withdrawn', cwtToken)}
  onNoticeShown={() => console.log('Didomi Notice Shown')}
  onNoticeHidden={() => console.log('Didomi Notice Hidden')}
  onNoticeBackdropclick={() => console.log('Didomi Notice Backdrop Click')}
  onNoticeClickAgree={() => console.log('Didomi Notice Click Agree')}
  onNoticeClickMoreInfo={() => console.log('Didomi Notice Click More Info')}
  onPreferencesClickAgreeToAll={() => console.log('Didomi Preferences Click Agree to All')}
  onPreferencesClickDisagreeToAll={() => console.log('Didomi Preferences Click Disagree to All')}
  onPreferencesClickPurposeAgree={purposeId => console.log('Didomi Preferences Click Purpose Agree', purposeId)}
  onPreferencesClickPurposeDisagree={purposeId => console.log('Didomi Preferences Click Purpose Disagree', purposeId)}
  onPreferencesClickViewVendors={() => console.log('Didomi Preferences Click View Vendors')}
  onPreferencesClickSaveChoices={() => console.log('Didomi Preferences Click Save Choices')}
  onPreferencesClickVendorAgree={vendorId => console.log('Didomi Preferences Click Vendor Agree', vendorId)}
  onPreferencesClickVendorDisagree={vendorId => console.log('Didomi Preferences Click Vendor Disagree', vendorId)}
  onPreferencesClickVendorSaveChoices={() => console.log('Didomi Preferences Click Vendor Save Choices')}
/>
```

The Didomi SDK will automatically download its configuration from the Didomi Console.  
Configuration modifications applied through the Didomi Console will be distributed to your users automatically, without modifications to your code.

### Instantiate the component with a local configuration

If you prefer, you can pass a local configuration the Didomi SDK instead of managing the configuration through the Didomi Console.  
With this setup, modifying your configuration will require that you also re-deploy your app.

You can use local configuration to override some remote configuration as well. For instance, you can provide your own notice (see the `Customize the notice` section below) while still using the Didomi Console for the rest of the configuration.

Instantiate the component in your app:
```jsx
const didomiConfig = {  
  app: {
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
  iabVersion={1} // If you want to support the TCF v2, don't forget to change this value. This parameter will load the correct stub in the React Component
  noticeId="NOTICE_ID" // If you want to target the notice by ID and not by domain
  gdprAppliesGlobally={true}
  onReady={didomi => console.log('Didomi SDK is loaded and ready', didomi)}
  onConsentChanged={cwtToken => console.log('A consent has been given/withdrawn', cwtToken)}
  onNoticeShown={() => console.log('Didomi Notice Shown')}
  onNoticeHidden={() => console.log('Didomi Notice Hidden')}
  onNoticeBackdropclick={() => console.log('Didomi Notice Backdrop Click')}
  onNoticeClickAgree={() => console.log('Didomi Notice Click Agree')}
  onNoticeClickMoreInfo={() => console.log('Didomi Notice Click More Info')}
  onPreferencesClickAgreeToAll={() => console.log('Didomi Preferences Click Agree to All')}
  onPreferencesClickDisagreeToAll={() => console.log('Didomi Preferences Click Disagree to All')}
  onPreferencesClickPurposeAgree={purposeId => console.log('Didomi Preferences Click Purpose Agree', purposeId)}
  onPreferencesClickPurposeDisagree={purposeId => console.log('Didomi Preferences Click Purpose Disagree', purposeId)}
  onPreferencesClickViewVendors={() => console.log('Didomi Preferences Click View Vendors')}
  onPreferencesClickSaveChoices={() => console.log('Didomi Preferences Click Save Choices')}
  onPreferencesClickVendorAgree={vendorId => console.log('Didomi Preferences Click Vendor Agree', vendorId)}
  onPreferencesClickVendorDisagree={vendorId => console.log('Didomi Preferences Click Vendor Disagree', vendorId)}
  onPreferencesClickVendorSaveChoices={() => console.log('Didomi Preferences Click Vendor Save Choices')}
/>
  ```

## Configuration options (props)

The following configuration options can be passed as props to the `DidomiSDK` component:

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
      <td>apiKey</td>
      <td>string</td>
      <td>null</td>
      <td>Your API Key</td>
    </tr>
    <tr>
      <td>iabVersion</td>
      <td>number</td>
      <td>1</td>
      <td>The IAB TCF Version you want to support (1 or 2)</td>
    </tr>
    <tr>
      <td>noticeId</td>
      <td>string</td>
      <td></td>
      <td>The ID of the remote notice you want to target (If you choose not the target by domain)</td>
    </tr>
    <tr>
      <td>config</td>
      <td>object</td>
      <td>{}</td>
      <td>Configuration of the SDK, please go below to see the configuration object structure</td>
    </tr>
    <tr>
      <td>gdprAppliesGlobally</td>
      <td>boolean</td>
      <td>true</td>
      <td>The banner should display to all users no matter where they are located. If you are a non EU-based company then you are only required to collect consent and show the banner to EU visitors and can configure the banner to do so by changing the  gdprAppliesGlobally variable to false in the tag above (that variable is separate from the window.didomiConfig variable).<br>
      Please note that if you are an EU-based company then you must collect consent and display the banner to all visitors, no matter where they are from.</td>
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
    </tr>
    <tr>
      <td>onNoticeBackdropclick</td>
      <td>function</td>
      <td></td>
      <td>Called when the backdrop from the popup notice is clicked</td>
    </tr>
    </tr>
    <tr>
      <td>onNoticeClickAgree</td>
      <td>function</td>
      <td></td>
      <td>Called when user clicks on agree on the notice</td>
    </tr>
    </tr>
    <tr>
      <td>onNoticeClickMoreInfo</td>
      <td>function</td>
      <td></td>
      <td>Called when user clicks on learn more on the notice</td>
    </tr>
    </tr>
    <tr>
      <td>onPreferencesClickAgreeToAll</td>
      <td>function</td>
      <td></td>
      <td>Called when user clicks on agree to all on the preferences popup</td>
    </tr>
    </tr>
    <tr>
      <td>onPreferencesClickDisagreeToAll</td>
      <td>function</td>
      <td></td>
      <td>Called when user clicks on disagree to all on the preferences popup</td>
    </tr>
    </tr>
    <tr>
      <td>onPreferencesClickPurposeAgree</td>
      <td>function</td>
      <td></td>
      <td>Called when user agree to a purpose on the preferences popup. (purposeId provided as a parameter)</td>
    </tr>
    </tr>
    <tr>
      <td>onPreferencesClickPurposeDisagree</td>
      <td>function</td>
      <td></td>
      <td>Called when user disagree to a purpose on the preferences popup. (purposeId provided as a parameter)</td>
    </tr>
    </tr>
    <tr>
      <td>onPreferencesClickViewVendors</td>
      <td>function</td>
      <td></td>
      <td>Called when user clicks on view vendors on the preferences popup</td>
    </tr>
    </tr>
    <tr>
      <td>onPreferencesClickSaveChoices</td>
      <td>function</td>
      <td></td>
      <td>Called when user saves his choice on the preferences popup</td>
    </tr>
    </tr>
    <tr>
      <td>onPreferencesClickVendorAgree</td>
      <td>function</td>
      <td></td>
      <td>Called when user agree to a vendor on the preferences popup. (vendorId provided as a parameter)</td>
    </tr>
    </tr>
    <tr>
      <td>onPreferencesClickVendorDisagree</td>
      <td>function</td>
      <td></td>
      <td>Called when user disagree to a vendor on the preferences popup. (vendorId provided as a parameter)</td>
    </tr>
    </tr>
    <tr>
      <td>onPreferencesClickVendorSaveChoices</td>
      <td>function</td>
      <td></td>
      <td>Called when user saves his choice on the vendors view on the preferences popup</td>
    </tr>
  </tbody>
</table>


### Configuration object

This is the structure of the configuration object passed to the `config` prop. For more information, please visit our [SDK documentation](https://developers.didomi.io/cmp/web-sdk/getting-started)

```js
{
  app: {
    ignoreCountry: true,
    privacyPolicyURL: 'http://example.com',
    name: 'Example',
    apiKey: '<Your API key>',
    logoUrl: 'http://logo.png',
    vendors: {
      iab: { // You either choose the option 'all', with optionaly 'exclude', or the 'include' option where you add the vendors manually
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
    closeOnClickBackdrop: false,
    daysBeforeShowingAgain: 0,
    textAlignment: 'left',
    learnMorePosition: null,
    learnMoreMargin: '20px 0 0 0',
    logoAlignment: 'flex-start',
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
    enableAllButtons: true,
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
    linkColor: '#3F51B5', // Color used for the links in the notice/popup
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


## Example

```jsx
import React, { Component } from 'react'

import { DidomiSDK } from '@didomi/react'

/**
 * This is the configuration object that will set the Didomi SDK
 */
const didomiConfig = {  
  app: {
    name: 'Didomi',
    apiKey: 'API_KEY',
    vendors: {
      iab: {
        all: true,
        version: 2
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
        iabVersion={2}
        config={didomiConfig}
        gdprAppliesGlobally={true}
        onReady={this.onDidomiReady.bind(this)}
        onConsentChanged={this.consentHasChanged.bind(this)}
      />
      <button onClick={() => this.didomiObject.setUserAgreeToAll()}>Set Agree to All</button>
    </div>
  }
}
  ```
 
## Customize the notice

You can use your own custom notice to replace the standard Didomi SDK notices (banner or popup). This option keeps some native behaviors like the position of the notice, the backdrop (for the popup notice) or the logic to decide when to display the notice.

Set your HTML in the `notice.content.html` key of the `config` prop:

### Custom React component in the notice

If you want to keep all the advantages of React, you can call our callback function that returns the notice HTML element and render your own React component inside:

  ```jsx
import { render } from 'react-dom'

class NoticeHTML extends Component {
  openPreferences() {
    Didomi.preferences.show()
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

const didomiConfig = {
  app: {    
    apiKey: '<Your API key>',        
    notice: {
      content: {
        html: {
          en: element => {
            render(<NoticeHTML shouldDisplayMoreText={false} />, element)
          }
        }
      }
    }
  }
}

...

<DidomiSDK config={didomiConfig}/>
```

Other keys in `notice.content` will be ignored.

### Custom HTML in the notice

You can do everything through HTML:

  ```js
  const didomiConfig = {
  app: {    
    apiKey: '<Your API key>',        
    notice: {
      content: {
        html: {
          en: '<div>Custom Notice</div>'
        }
      }
    }
  }
}

...

<DidomiSDK config={didomiConfig}/>
  ```
 
### Didomi SDK Documentation

See [Documentation](https://developers.didomi.io/cmp/web-sdk)

### License

MIT