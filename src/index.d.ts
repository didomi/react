// Type definitions for @didomi/react 1.2.2
// Project: https://github.com/didomi/react
// TypeScript Version: 2.8

import { Component } from 'react';
import { IDidomiConfig } from './index';

export = DidomiReact;
export as namespace DidomiReact;

declare namespace DidomiReact {
  type ConsentID = number | string;
  type ConsentStatus = boolean | undefined;

  interface IPreferencesObject {
    show?: () => void;
  }

  interface INoticeObject {
    show?: () => void;
  }

  interface IUserConsentStatus {
    purposes: {
      enabled: any[],
      disabled: any[],
    };
    vendor: {
      enabled: any[],
      disabled: any[],
    }
  }

  /**
   * Didomi Object (exported by the SDK as window.Didomi)
   */
  export interface IDidomiObject {
    on?(event: string, eventHandler: Function): void;
    preferences?: IPreferencesObject;
    notice?: INoticeObject;
    isConsentRequired?: () =>  boolean;
    getUserConsentStatusForVendor?: (vendorId: ConsentID) => ConsentStatus;
    getUserConsentStatusForPurpose?: (purposeId: ConsentID) => ConsentStatus;
    getUserConsentStatus?: (purposeId: ConsentID, vendorId: ConsentID) => IUserConsentStatus;
    setUserAgreeToAll?: () => void;

    // Add support for missing methods and properties
    [key: string]: any;
  }

  export type OnConsentChangedFunction = (consentToken: string) => any;
  export type OnPreferencesClickPurposeFunction = (purposeId: string) => any;
  export type OnPreferencesClickVendorFunction = (vendorId: string) => any;
  export type OnReadyFunction = (didomi: IDidomiObject) => any;
  // Force an object type for didomiConfig
  interface IDidomiConfig { [key: string]: any; }

  /**
   * Didomi SDK Component Props (React)
   */
  interface IDidomiSDKProps {
    apiKey?: string;
    config?: IDidomiConfig;
    gdprAppliesGlobally?: boolean;
    onReady?: OnReadyFunction;
    onConsentChanged?: OnConsentChangedFunction;
    onNoticeShown?: Function;
    onNoticeHidden?: Function;
    onNoticeBackdropclick?: Function;
    onNoticeClickAgree?: Function;
    onNoticeClickMoreInfo?: Function;
    onPreferencesClickAgreeToAll?: Function;
    onPreferencesClickDisagreeToAll?: Function;
    onPreferencesClickPurposeAgree?: OnPreferencesClickPurposeFunction;
    onPreferencesClickPurposeDisagree?: OnPreferencesClickPurposeFunction;
    onPreferencesClickViewVendors?: Function;
    onPreferencesClickSaveChoices?: Function;
    onPreferencesClickVendorAgree?: OnPreferencesClickVendorFunction;
    onPreferencesClickVendorDisagree?: OnPreferencesClickVendorFunction;
    onPreferencesClickVendorSaveChoices?: Function;
  }

  /**
   * DidomiSDK React Component
   */
  export class DidomiSDK extends Component<IDidomiSDKProps> {}
}
