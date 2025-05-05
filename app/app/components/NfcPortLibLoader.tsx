"use client";

import Script from "next/script";

export default function NfcPortLibLoader() {
  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: `
          import {
            NFCPortLib,
            Configuration,
            DetectionOption,
          } from 'https://cdn.felica-support.sony.biz/webclient/trial/NFCPortLib.js';

          window.NFCPortLib = NFCPortLib;
          window.Configuration = Configuration;
          window.DetectionOption = DetectionOption;
        `,
      }}
      id="nfc-port-lib-loader-script"
      type="module"
    />
  );
}
