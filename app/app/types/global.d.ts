import { routing } from "~/i18n/routing";
import messages from "~/messages/en.json";

export {};

declare global {
  interface Window {
    NFCPortLib: typeof NFCPortLib;
    Configuration: typeof Configuration;
    DetectionOption: typeof DetectionOption;
  }
}

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
