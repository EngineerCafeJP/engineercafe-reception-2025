declare class NFCPortLib {
  constructor();
  init(config: Configuration): Promise<void>;
  open(): Promise<void>;
  close(): Promise<void>;
  detectCard(cardType: string, option?: DetectionOption): Promise<TargetCard>;
}

declare class Configuration {
  constructor(timeout?: number, retryCount?: number);
  timeout: number;
  retryCount: number;
}

declare class DetectionOption {
  constructor(
    idm?: Uint8Array,
    timeout?: number,
    autoPolling?: boolean,
    autoActivation?: boolean,
    autoActivationRetry?: number,
  );
  idm: Uint8Array;
  timeout: number;
  autoPolling: boolean;
  autoActivation: boolean;
  autoActivationRetry: number;
}

declare class TargetCard {
  idm: Uint8Array | null;
  uid: Uint8Array | null;
}
