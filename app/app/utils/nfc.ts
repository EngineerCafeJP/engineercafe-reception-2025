export class Nfc {
  private nfcPortLib: NFCPortLib | null = null;
  private config: Configuration | null = null;
  private log: (...args: unknown[]) => void;

  constructor(debug: boolean = false) {
    this.log = debug ? console.log : () => {};
  }

  async connectUsbDevice(): Promise<void> {
    try {
      this.log("NFCPortLibを初期化中...");
      this.nfcPortLib = new window.NFCPortLib();
      this.config = new window.Configuration(500, 500);
      await this.nfcPortLib.init(this.config);
      this.log("NFCPortLibを初期化しました。");

      this.log("NFCリーダーに接続中...");
      await this.nfcPortLib.open();
      this.log("NFCリーダーに接続しました。");
    } catch (e) {
      this.log("NFCリーダーの接続に失敗:", e);
      throw e;
    }
  }

  async disconnectUsbDevice(): Promise<void> {
    if (this.nfcPortLib) {
      try {
        this.log("NFCリーダーと切断中...");
        await this.nfcPortLib.close();
        this.nfcPortLib = null;
        this.config = null;
        this.log("NFCリーダーと切断しました。");
      } catch (e) {
        this.log("NFCリーダーと切断中にエラーが発生:", e);
        throw e;
      }
    }
  }

  private toHexString(label: string, bytes: Uint8Array): string {
    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
    this.log(`${label}: ${hex}`);
    return hex;
  }

  private async detectCard(
    label: string,
    type: string,
    options?: DetectionOption,
  ): Promise<string | undefined> {
    if (!this.nfcPortLib) {
      throw new Error("NFCリーダーが接続されていません。");
    }

    try {
      this.log(`${label}を検出中...`);
      const card = await this.nfcPortLib.detectCard(type, options);
      const id = card.idm || card.uid;

      if (id) {
        return this.toHexString(`${label}を検出`, id);
      }
    } catch (e) {
      this.log(`${label}の検出に失敗:`, e);
      throw e;
    }
  }

  async detectCardId(protocol: "A" | "F"): Promise<string | undefined> {
    try {
      if (protocol === "A") {
        return await this.detectCard("Type Aカード", "iso14443-3A");
      } else {
        return await this.detectCard(
          "FeliCaカード",
          "iso18092",
          new window.DetectionOption(
            new Uint8Array([0xff, 0xff]),
            0,
            true,
            false,
          ),
        );
      }
    } catch (e) {
      this.log("カード検出中にエラーが発生:", e);
    }
  }
}
