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
  delete window.__cmp;
  delete window.gdprAppliesGlobally;
  delete window.didomiCountry;
});

it('loads and initializes the Didomi SDK (TCFv2)', async () => {
  root = createRoot(
    document.body.appendChild(document.createElement('iframe')),
  );
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      iabVersion={2}
      country="FR"
    />,
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
it('loads the Didomi SDK from a specific SDK path (TCFv2)', async function () {
  this.timeout(10000);
  root = createRoot(document.body.appendChild(document.createElement('DIV')));
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      iabVersion={2}
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

it('loads the Didomi SDK with a specific notice ID (TCFv2)', async () => {
  root = createRoot(document.body.appendChild(document.createElement('DIV')));
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      iabVersion={2}
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
      iabVersion={2}
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

it('loads and initializes the Didomi SDK (TCFv1)', async () => {
  root = createRoot(
    document.body.appendChild(document.createElement('iframe')),
  );
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      iabVersion={1}
      country="FR"
    />,
  );

  await sdkReady();

  // Ensure that the SDK is correctly embedded on the page
  const sdkScript = document.querySelector('#spcloader');
  expect(sdkScript).toExist();
  expect(sdkScript.src).toEqual(
    'https://sdk.privacy-center.org/03f1af55-a479-4c1f-891a-7481345171ce/loader.js?target=localhost&country=FR',
  );

  expect(typeof window.__cmp).toEqual('function');
});

// This is intentionally not an arrow function, so that the this binding is not lost and the this.timeout(10000) applies
// Otherwise we will get flaky results. The tests are cut short at 2000ms when fetching data from the specified sdk path
it('loads the Didomi SDK from a specific SDK path (TCFv1)', async function () {
  this.timeout(10000);
  root = createRoot(document.body.appendChild(document.createElement('DIV')));
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      iabVersion={1}
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

it('loads the Didomi SDK with a specific notice ID (TCFv1)', async () => {
  root = createRoot(document.body.appendChild(document.createElement('DIV')));
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      iabVersion={1}
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

it('loads the Didomi SDK with a specific platform (CTV) (TCFv1)', async () => {
  root = createRoot(document.body.appendChild(document.createElement('DIV')));
  root.render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      iabVersion={1}
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
  it('embeds the TCF stub if the embedTCFStub prop is not provided (TCFv2)', async function () {
    const config = {
      app: {
        vendors: {
          iab: {
            enabled: false,
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
        iabVersion={2}
        config={config}
        country="FR"
      />,
    );

    await sdkReady();

    expect(typeof window.__tcfapi).toEqual('function');
    expect(typeof window.__cmp).toEqual('undefined');
  });

  it('embeds the TCF stub if the embedTCFStub prop is true (TCFv2)', async function () {
    const config = {
      app: {
        vendors: {
          iab: {
            enabled: false,
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
        iabVersion={2}
        embedTCFStub={true}
        config={config}
        country="FR"
      />,
    );

    await sdkReady();

    expect(typeof window.__tcfapi).toEqual('function');
    expect(typeof window.__cmp).toEqual('undefined');
  });

  it('embeds the TCF stub if the embedTCFStub prop is not provided (TCFv1)', async function () {
    const config = {
      app: {
        vendors: {
          iab: {
            enabled: false,
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
        iabVersion={1}
        config={config}
        country="FR"
      />,
    );

    await sdkReady();

    expect(typeof window.__cmp).toEqual('function');
    expect(typeof window.__tcfapi).toEqual('undefined');
  });

  it('embeds the TCF stub if the embedTCFStub prop is true (TCFv1)', async function () {
    const config = {
      app: {
        vendors: {
          iab: {
            enabled: false,
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
        iabVersion={1}
        embedTCFStub={true}
        config={config}
        country="FR"
      />,
    );

    await sdkReady();

    expect(typeof window.__cmp).toEqual('function');
    expect(typeof window.__tcfapi).toEqual('undefined');
  });

  it('does not embed the TCF stub if embedTCFStub prop is set to false', async function () {
    const config = {
      app: {
        vendors: {
          iab: {
            enabled: false,
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
        iabVersion={2}
        embedTCFStub={false}
        config={config}
        country="FR"
      />,
    );

    await sdkReady();

    expect(window.__tcfapi).toEqual(undefined);
    expect(window.__cmp).toEqual(undefined);
  });
});
