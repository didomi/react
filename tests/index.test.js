import expect from 'expect';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { DidomiSDK } from 'src/';

/**
 * Wait for the SDK to be ready
 */
function sdkReady() {
  return new Promise((resolve) => {
    window.didomiOnReady = window.didomiOnReady || [];
    window.didomiOnReady.push(resolve);
  });
}

let root;

/**
 * Clean up global objects created by the SDK
 */
beforeEach(function () {
  this.timeout(5000);

  const didomiScripts = document.querySelectorAll('#spcloader');
  didomiScripts.forEach((scriptTag) => {
    scriptTag.parentNode.removeChild(scriptTag);
  });

  delete window.didomiOnReady;
  delete window.didomiEventListeners;
  delete window.Didomi;
  delete window.didomiConfig;
  delete window.__tcfapi;
  delete window.__tcfapiBuffer;
  delete window.__gpp;
  delete window.__gpp_stub;
  delete window.__gpp_addFrame;
  delete window.__gpp_msghandler;
  delete window.gdprAppliesGlobally;
  delete window.didomiCountry;
});

it('loads and initializes the Didomi SDK', async () => {
  root = createRoot(
    document.body.appendChild(document.createElement('iframe')),
  );
  root.render(
    <DidomiSDK apiKey="03f1af55-a479-4c1f-891a-7481345171ce" country="FR" />,
  );

  await sdkReady();

  // Ensure that the SDK is correctly embedded on the page
  const sdkScript = document.querySelector('#spcloader');
  expect(sdkScript).toExist();
  expect(sdkScript.src).toEqual(
    'https://sdk.privacy-center.org/03f1af55-a479-4c1f-891a-7481345171ce/loader.js?target=localhost&country=FR',
  );

  expect(typeof window.__tcfapi).toEqual('function');
});

// This is intentionally not an arrow function, so that the this binding is not lost and the this.timeout(10000) applies
// Otherwise we will get flaky results. The tests are cut short at 2000ms when fetching data from the specified sdk path
it('loads the Didomi SDK from a specific SDK path', async function () {
  this.timeout(10000);
  root = createRoot(document.body.appendChild(document.createElement('DIV')));
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      sdkPath="https://sdk.staging.privacy-center.org/"
      country="FR"
    />,
  );

  await sdkReady();

  // Ensure that the SDK is correctly embedded on the page
  const sdkScript = document.querySelector('#spcloader');
  expect(sdkScript).toExist();
  expect(sdkScript.src).toEqual(
    'https://sdk.staging.privacy-center.org/03f1af55-a479-4c1f-891a-7481345171ce/loader.js?target=localhost&country=FR',
  );

  expect(window.didomiConfig.sdkPath).toEqual(
    'https://sdk.staging.privacy-center.org/',
  );
});

it('loads the Didomi SDK with a specific notice ID', async () => {
  root = createRoot(document.body.appendChild(document.createElement('DIV')));
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      noticeId="noticeId"
      country="FR"
    />,
  );

  await sdkReady();

  // Ensure that the SDK is correctly embedded on the page
  const sdkScript = document.querySelector('#spcloader');
  expect(sdkScript).toExist();
  expect(sdkScript.src).toEqual(
    'https://sdk.privacy-center.org/03f1af55-a479-4c1f-891a-7481345171ce/loader.js?target_type=notice&target=noticeId&country=FR',
  );
});

it('loads the Didomi SDK with a specific platform (CTV)', async () => {
  root = createRoot(document.body.appendChild(document.createElement('DIV')));
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      noticeId="noticeId"
      platform="ctv"
      country="FR"
    />,
  );

  await sdkReady();

  // Ensure that the SDK is correctly embedded on the page
  const sdkScript = document.querySelector('#spcloader');
  expect(sdkScript).toExist();
  expect(sdkScript.src).toEqual(
    'https://sdk.privacy-center.org/03f1af55-a479-4c1f-891a-7481345171ce/loader.js?platform=ctv&target_type=notice&target=noticeId&country=FR',
  );
});

it('loads the Didomi SDK only one time even if component is rendered multiple times', async () => {
  root = createRoot(document.body.appendChild(document.createElement('DIV')));
  root.render(
    <DidomiSDK apiKey="03f1af55-a479-4c1f-891a-7481345171ce" country="FR" />,
  );

  root = createRoot(document.body.appendChild(document.createElement('DIV')));
  root.render(
    <DidomiSDK apiKey="03f1af55-a479-4c1f-891a-7481345171ce" country="FR" />,
  );

  await sdkReady();

  // Ensure that the SDK is correctly embedded on the page
  const sdkScript = document.querySelectorAll('#spcloader');
  expect(sdkScript.length).toEqual(1);
});

it('loads the Didomi SDK with country and region query-string parameters', async () => {
  root = createRoot(document.body.appendChild(document.createElement('DIV')));
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      country="US"
      region="CA"
    />,
  );

  await sdkReady();

  // Ensure that the SDK is correctly embedded on the page with country and region params
  const sdkScript = document.querySelector('#spcloader');
  expect(sdkScript).toExist();
  expect(sdkScript.src).toEqual(
    'https://sdk.privacy-center.org/03f1af55-a479-4c1f-891a-7481345171ce/loader.js?target=localhost&country=US&region=CA',
  );
});

it('calls onReady', async () => {
  let ready = false;
  const onReady = () => (ready = true);

  root = createRoot(
    document.body.appendChild(document.createElement('iframe')),
  );
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      onReady={onReady}
      country="FR"
    />,
  );

  await sdkReady();
  expect(ready).toEqual(true);
});

it('calls onNoticeShown', (done) => {
  const eventHandler = () => {
    done();
  };

  const config = {
    app: {
      vendors: {
        iab: {
          enabled: true,
          all: true,
        },
      },
    },
  };

  root = createRoot(
    document.body.appendChild(document.createElement('iframe')),
  );
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      config={config}
      gdprAppliesGlobally={true}
      onNoticeShown={eventHandler}
      country="FR"
    />,
  );
});

it('sets the didomiConfig', async () => {
  const didomiConfig = {
    key: 'value',
  };

  root = createRoot(document.body.appendChild(document.createElement('DIV')));
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      config={didomiConfig}
      country="FR"
    />,
  );

  await sdkReady();

  expect(window.didomiConfig).toEqual(didomiConfig);
});

it('sets gdprAppliesGlobally to true', async () => {
  root = createRoot(document.body.appendChild(document.createElement('DIV')));
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      gdprAppliesGlobally={true}
      country="FR"
    />,
  );

  await sdkReady();

  expect(window.gdprAppliesGlobally).toEqual(true);
});

it('sets gdprAppliesGlobally to false', async () => {
  root = createRoot(document.body.appendChild(document.createElement('DIV')));
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      gdprAppliesGlobally={false}
      country="FR"
    />,
  );

  await sdkReady();

  expect(window.gdprAppliesGlobally).toEqual(false);
});

describe('TCF stub', () => {
  // Use an invalid sdkPath to prevent the SDK from loading,
  // ensuring we test the stub behavior without race conditions
  const nonLoadingSdkPath = 'about:blank#';

  // Helper to wait for React to render and the stub to be embedded
  const waitForStub = () => new Promise((resolve) => setTimeout(resolve, 50));

  it('embeds the TCF stub if the embedTCFStub prop is not provided', async function () {
    root = createRoot(
      document.body.appendChild(document.createElement('iframe')),
    );
    root.render(
      <DidomiSDK
        apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
        sdkPath={nonLoadingSdkPath}
        country="FR"
      />,
    );

    await waitForStub();

    expect(typeof window.__tcfapi).toEqual('function');
    expect(window.__tcfapi.stub).toEqual(true);
  });

  it('embeds the TCF stub if the embedTCFStub prop is true', async function () {
    root = createRoot(
      document.body.appendChild(document.createElement('iframe')),
    );
    root.render(
      <DidomiSDK
        apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
        sdkPath={nonLoadingSdkPath}
        embedTCFStub={true}
        country="FR"
      />,
    );

    await waitForStub();

    expect(typeof window.__tcfapi).toEqual('function');
    expect(window.__tcfapi.stub).toEqual(true);
  });

  it('does not embed the TCF stub if embedTCFStub prop is set to false', async function () {
    root = createRoot(
      document.body.appendChild(document.createElement('iframe')),
    );
    root.render(
      <DidomiSDK
        apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
        sdkPath={nonLoadingSdkPath}
        embedTCFStub={false}
        country="FR"
      />,
    );

    await waitForStub();

    expect(window.__tcfapi).toEqual(undefined);
  });

  it('embeds the correct TCF v2 stub structure', async function () {
    root = createRoot(
      document.body.appendChild(document.createElement('iframe')),
    );
    root.render(
      <DidomiSDK
        apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
        sdkPath={nonLoadingSdkPath}
        country="FR"
      />,
    );

    await waitForStub();

    // Verify __tcfapi is a stub function
    expect(typeof window.__tcfapi).toEqual('function');
    expect(window.__tcfapi.stub).toEqual(true);

    // Verify the __tcfapiLocator iframe is created and hidden from AT
    expect(window.frames['__tcfapiLocator']).toExist();
    const tcfLocator = document.querySelector('iframe[name="__tcfapiLocator"]');
    expect(tcfLocator.getAttribute('aria-hidden')).toEqual('true');
    expect(tcfLocator.tabIndex).toEqual(-1);

    // Verify commands are queued in __tcfapiBuffer
    window.__tcfapi('ping', 2, () => {});

    expect(Array.isArray(window.__tcfapiBuffer)).toEqual(true);
    expect(window.__tcfapiBuffer.length).toBeGreaterThan(0);

    const lastBufferEntry =
      window.__tcfapiBuffer[window.__tcfapiBuffer.length - 1];
    expect(lastBufferEntry.command).toEqual('ping');
    expect(lastBufferEntry.parameter).toEqual(2);
    expect(typeof lastBufferEntry.callback).toEqual('function');
  });
});

describe('GPP stub', () => {
  // Use an invalid sdkPath to prevent the SDK from loading,
  // ensuring we test the stub behavior without race conditions
  const nonLoadingSdkPath = 'about:blank#';

  // Helper to wait for React to render and the stub to be embedded
  const waitForStub = () => new Promise((resolve) => setTimeout(resolve, 50));

  it('does not embed the GPP stub by default', async function () {
    root = createRoot(
      document.body.appendChild(document.createElement('iframe')),
    );
    root.render(
      <DidomiSDK
        apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
        sdkPath={nonLoadingSdkPath}
        country="FR"
      />,
    );

    await waitForStub();

    expect(window.__gpp).toEqual(undefined);
  });

  it('embeds the GPP stub if the embedGPPStub prop is true', async function () {
    root = createRoot(
      document.body.appendChild(document.createElement('iframe')),
    );
    root.render(
      <DidomiSDK
        apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
        sdkPath={nonLoadingSdkPath}
        embedGPPStub={true}
        country="FR"
      />,
    );

    await waitForStub();

    expect(typeof window.__gpp).toEqual('function');
    expect(window.frames['__gppLocator']).toExist();
  });

  it('does not embed the GPP stub if embedGPPStub prop is set to false', async function () {
    root = createRoot(
      document.body.appendChild(document.createElement('iframe')),
    );
    root.render(
      <DidomiSDK
        apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
        sdkPath={nonLoadingSdkPath}
        embedGPPStub={false}
        country="FR"
      />,
    );

    await waitForStub();

    expect(window.__gpp).toEqual(undefined);
  });

  it('embeds the correct GPP stub structure', async function () {
    root = createRoot(
      document.body.appendChild(document.createElement('iframe')),
    );
    root.render(
      <DidomiSDK
        apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
        sdkPath={nonLoadingSdkPath}
        embedGPPStub={true}
        country="FR"
      />,
    );

    await waitForStub();

    // Verify __gpp is a stub function
    expect(typeof window.__gpp).toEqual('function');

    // Verify the __gppLocator iframe is created and hidden from AT
    expect(window.frames['__gppLocator']).toExist();
    const gppLocator = document.querySelector('iframe[name="__gppLocator"]');
    expect(gppLocator.getAttribute('aria-hidden')).toEqual('true');
    expect(gppLocator.tabIndex).toEqual(-1);

    // Verify the ping command returns the expected stub payload
    let pingResponse;
    let pingSuccess;
    window.__gpp('ping', (response, success) => {
      pingResponse = response;
      pingSuccess = success;
    });

    expect(pingSuccess).toEqual(true);
    expect(pingResponse.gppVersion).toEqual('1.1');
    expect(pingResponse.cmpStatus).toEqual('stub');
    expect(pingResponse.signalStatus).toEqual('not ready');

    // Verify unknown commands are queued on __gpp.queue
    window.__gpp('someUnknownCommand', () => {}, 'param');

    expect(Array.isArray(window.__gpp.queue)).toEqual(true);
    expect(window.__gpp.queue.length).toBeGreaterThan(0);

    const lastQueueEntry = window.__gpp.queue[window.__gpp.queue.length - 1];
    expect(lastQueueEntry[0]).toEqual('someUnknownCommand');
    expect(typeof lastQueueEntry[1]).toEqual('function');
    expect(lastQueueEntry[2]).toEqual('param');
  });
});
