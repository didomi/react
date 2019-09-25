import expect from 'expect';
import React from 'react';
import { render } from 'react-dom';

import { DidomiSDK } from 'src/'

describe('DidomiSDK', () => {
  it('loads and initializes the Didomi SDK', async () => {
    const div = document.createElement('div');
    div.id = 'test';
    document.querySelector('body').appendChild(div);
    
    const sdkInstance = <DidomiSDK apiKey="03f1af55-a479-4c1f-891a-7481345171ce" />;

    render(sdkInstance, div);

    expect(sdkInstance).toExist();

    const sdkScript = document.querySelector('script[id="spcloader"]');
    expect(sdkScript).toExist();
    expect(sdkScript.src).toEqual('https://sdk.privacy-center.org/03f1af55-a479-4c1f-891a-7481345171ce/loader.js?target=localhost');

    // Ensuring that no error is thrown when a message with invalid JSON is sent to the window
    window.postMessage('test', '*');

    return new Promise((resolve) => {
      window.didomiOnReady = window.didomiOnReady || [];
      window.didomiOnReady.push(resolve);
    });
  });
})