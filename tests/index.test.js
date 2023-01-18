import expect from 'expect';
import React from 'react';
import { render } from 'react-dom';

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
});

it('loads and initializes the Didomi SDK (TCFv2)', async () => {
  render(
    <DidomiSDK apiKey="03f1af55-a479-4c1f-891a-7481345171ce" iabVersion={2} />,
    document.body.appendChild(document.createElement('iframe')),
  );

  await sdkReady();

  // Ensure that the SDK is correctly embedded on the page
  const sdkScript = document.querySelector('#spcloader');
  expect(sdkScript).toExist();
  expect(sdkScript.src).toEqual(
    'https://sdk.privacy-center.org/03f1af55-a479-4c1f-891a-7481345171ce/loader.js?target=localhost',
  );

  expect(typeof window.__tcfapi).toEqual('function');
});

// This is intentionally not an arrow function, so that the this binding is not lost and the this.timeout(10000) applies
// Otherwise we will get flaky results. The tests are cut short at 2000ms when fetching data from the specified sdk path
it('loads the Didomi SDK from a specific SDK path (TCFv2)', async function () {
  this.timeout(10000);
  render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      iabVersion={2}
      sdkPath="https://sdk.staging.privacy-center.org/"
    />,
    document.body.appendChild(document.createElement('DIV')),
  );

  await sdkReady();

  // Ensure that the SDK is correctly embedded on the page
  const sdkScript = document.querySelector('#spcloader');
  expect(sdkScript).toExist();
  expect(sdkScript.src).toEqual(
    'https://sdk.staging.privacy-center.org/03f1af55-a479-4c1f-891a-7481345171ce/loader.js?target=localhost',
  );

  expect(window.didomiConfig.sdkPath).toEqual(
    'https://sdk.staging.privacy-center.org/',
  );
});

it('loads the Didomi SDK with a specific notice ID (TCFv2)', async () => {
  render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      iabVersion={2}
      noticeId="noticeId"
    />,
    document.body.appendChild(document.createElement('DIV')),
  );

  await sdkReady();

  // Ensure that the SDK is correctly embedded on the page
  const sdkScript = document.querySelector('#spcloader');
  expect(sdkScript).toExist();
  expect(sdkScript.src).toEqual(
    'https://sdk.privacy-center.org/03f1af55-a479-4c1f-891a-7481345171ce/loader.js?target_type=notice&target=noticeId',
  );
});

it('loads and initializes the Didomi SDK (TCFv1)', async () => {
  render(
    <DidomiSDK apiKey="03f1af55-a479-4c1f-891a-7481345171ce" iabVersion={1} />,
    document.body.appendChild(document.createElement('iframe')),
  );

  await sdkReady();

  // Ensure that the SDK is correctly embedded on the page
  const sdkScript = document.querySelector('#spcloader');
  expect(sdkScript).toExist();
  expect(sdkScript.src).toEqual(
    'https://sdk.privacy-center.org/03f1af55-a479-4c1f-891a-7481345171ce/loader.js?target=localhost',
  );

  expect(typeof window.__cmp).toEqual('function');
});

// This is intentionally not an arrow function, so that the this binding is not lost and the this.timeout(10000) applies
// Otherwise we will get flaky results. The tests are cut short at 2000ms when fetching data from the specified sdk path
it('loads the Didomi SDK from a specific SDK path (TCFv1)', async function () {
  this.timeout(10000);
  render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      iabVersion={1}
      sdkPath="https://sdk.staging.privacy-center.org/"
    />,
    document.body.appendChild(document.createElement('DIV')),
  );

  await sdkReady();

  // Ensure that the SDK is correctly embedded on the page
  const sdkScript = document.querySelector('#spcloader');
  expect(sdkScript).toExist();
  expect(sdkScript.src).toEqual(
    'https://sdk.staging.privacy-center.org/03f1af55-a479-4c1f-891a-7481345171ce/loader.js?target=localhost',
  );

  expect(window.didomiConfig.sdkPath).toEqual(
    'https://sdk.staging.privacy-center.org/',
  );
});

it('loads the Didomi SDK with a specific notice ID (TCFv2)', async () => {
  render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      iabVersion={1}
      noticeId="noticeId"
    />,
    document.body.appendChild(document.createElement('DIV')),
  );

  await sdkReady();

  // Ensure that the SDK is correctly embedded on the page
  const sdkScript = document.querySelector('#spcloader');
  expect(sdkScript).toExist();
  expect(sdkScript.src).toEqual(
    'https://sdk.privacy-center.org/03f1af55-a479-4c1f-891a-7481345171ce/loader.js?target_type=notice&target=noticeId',
  );
});

it('loads the Didomi SDK only one time even if component is rendered multiple times', async () => {
  render(
    <DidomiSDK apiKey="03f1af55-a479-4c1f-891a-7481345171ce" />,
    document.body.appendChild(document.createElement('DIV')),
  );

  render(
    <DidomiSDK apiKey="03f1af55-a479-4c1f-891a-7481345171ce" />,
    document.body.appendChild(document.createElement('DIV')),
  );

  await sdkReady();

  // Ensure that the SDK is correctly embedded on the page
  const sdkScript = document.querySelectorAll('#spcloader');
  expect(sdkScript.length).toEqual(1);
});

it('calls onReady', async () => {
  let ready = false;
  const onReady = () => (ready = true);

  render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      onReady={onReady}
    />,
    document.body.appendChild(document.createElement('iframe')),
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

  render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      config={config}
      gdprAppliesGlobally={true}
      onNoticeShown={eventHandler}
    />,
    document.body.appendChild(document.createElement('iframe')),
  );
});

it('sets the didomiConfig', async () => {
  const didomiConfig = {
    key: 'value',
  };

  render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      config={didomiConfig}
    />,
    document.body.appendChild(document.createElement('DIV')),
  );

  await sdkReady();

  expect(window.didomiConfig).toEqual(didomiConfig);
});

it('sets gdprAppliesGlobally to true', async () => {
  render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      gdprAppliesGlobally={true}
    />,
    document.body.appendChild(document.createElement('DIV')),
  );

  await sdkReady();

  expect(window.gdprAppliesGlobally).toEqual(true);
});

it('sets gdprAppliesGlobally to false', async () => {
  render(
    <DidomiSDK
      apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
      gdprAppliesGlobally={false}
    />,
    document.body.appendChild(document.createElement('DIV')),
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

    render(
      <DidomiSDK
        apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
        iabVersion={2}
        config={config}
      />,
      document.body.appendChild(document.createElement('iframe')),
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

    render(
      <DidomiSDK
        apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
        iabVersion={2}
        embedTCFStub={true}
        config={config}
      />,
      document.body.appendChild(document.createElement('iframe')),
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

    render(
      <DidomiSDK
        apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
        iabVersion={1}
        config={config}
      />,
      document.body.appendChild(document.createElement('iframe')),
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

    render(
      <DidomiSDK
        apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
        iabVersion={1}
        embedTCFStub={true}
        config={config}
      />,
      document.body.appendChild(document.createElement('iframe')),
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

    render(
      <DidomiSDK
        apiKey="03f1af55-a479-4c1f-891a-7481345171ce"
        iabVersion={2}
        embedTCFStub={false}
        config={config}
      />,
      document.body.appendChild(document.createElement('iframe')),
    );

    await sdkReady();

    expect(window.__tcfapi).toEqual(undefined);
    expect(window.__cmp).toEqual(undefined);
  });
});
