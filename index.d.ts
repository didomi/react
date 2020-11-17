// Type definitions for @didomi/react 1.2.2
// Project: https://github.com/didomi/react
// TypeScript Version: 2.8

import { Component } from 'react';

export = DidomiReact;
export as namespace DidomiReact;

declare namespace DidomiReact {
  type ConsentID = number | string;
  type ConsentStatus = boolean | undefined;

  interface IPreferencesObject {
    show(): void;
    hide(): void;
    isVisible(): boolean;
  }

  interface INoticeObject {
    show(): void;
    configure(): void;
    hide(): void;
    isVisible(): boolean;
  }

  interface IPolicyObject {
    close(): void;
    open(): void;
  }

  interface IThemeObject {
    set(property: string, value: string): void;
  }

  interface IUserConsentStatus {
    purposes: {
      enabled: any[],
      disabled: any[],
    };
    vendors: {
      enabled: any[],
      disabled: any[],
    }
  }

  /**
   * Didomi Object (exported by the SDK as window.Didomi)
   */
  export interface IDidomiObject {
    version: string;
    on(event: string, eventHandler: Function): void;

    preferences: IPreferencesObject;
    notice: INoticeObject;
    policy: IPolicyObject;
    Purposes: {
      [key: string]: any;
    };

    getConfig(): any;
    getExperiment(): any;
    getLanguage(): any;
    getPurposes(): any;
    getRequiredPurposeIds(): any;
    getTranslationAsHTML(): any;
    getUserConsentStatusForAll(): any;
    getUserConsentToken(): any;
    getVendors(): any;
    getRequiredVendorIds(): any;
    getUserConsentStatusForVendor(vendorId: ConsentID): ConsentStatus;
    getUserConsentStatusForPurpose(purposeId: ConsentID): ConsentStatus;
    getUserConsentStatus(purposeId: ConsentID, vendorId: ConsentID): IUserConsentStatus;
    getObservableOnUserConsentStatusForVendor(vendorId: ConsentID): any;
    getPurposeById(id: ConsentID): any;
    getVendorById(id: ConsentID): any;
    getRequiredPurposes(type?: string): any;
    getRequiredVendors(type?: string): any;

    setUserConsentStatusForAll(): void;
    setUserDisagreeToAll(): void;
    setUserAgreeToAll(): void;
    setConfigParameter(param: any, value: any): void;
    setUserConsentStatus(purposeId: ConsentID, vendorId: ConsentID, value: any): void;

    isConsentRequired(): boolean;
    isUserConsentStatusPartial(): boolean;
    shouldConsentBeCollected(): boolean;

    configure(): any;
    openTransaction(): any;
    reset(): any;

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
    iabVersion?: number;
    noticeId?: string;
    config?: IDidomiConfig;
    gdprAppliesGlobally?: boolean;
    sdkPath?: string;
    embedTCFStub?: boolean;
    onReady?: OnReadyFunction;
    onConsentChanged?: OnConsentChangedFunction;
    onNoticeShown?(): any;
    onNoticeHidden?(): any;
    onNoticeBackdropclick?(): any;
    onNoticeClickAgree?(): any;
    onNoticeClickMoreInfo?(): any;
    onPreferencesClickAgreeToAll?(): any;
    onPreferencesClickDisagreeToAll?(): any;
    onPreferencesClickPurposeAgree?: OnPreferencesClickPurposeFunction;
    onPreferencesClickPurposeDisagree?: OnPreferencesClickPurposeFunction;
    onPreferencesClickViewVendors?(): any;
    onPreferencesClickSaveChoices?(): any;
    onPreferencesClickVendorAgree?: OnPreferencesClickVendorFunction;
    onPreferencesClickVendorDisagree?: OnPreferencesClickVendorFunction;
    onPreferencesClickVendorSaveChoices?(): any;
  }

  /**
   * DidomiSDK React Component
   */
  export class DidomiSDK extends Component<IDidomiSDKProps> {}
}
