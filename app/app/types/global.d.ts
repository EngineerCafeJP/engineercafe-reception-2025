export {};

declare global {
  interface Window {
    NFCPortLib: typeof NFCPortLib;
    Configuration: typeof Configuration;
    DetectionOption: typeof DetectionOption;
  }
}
