import { useEffect, useRef, useState } from "react";
import { Nfc } from "@/utils/nfc";
import { sleep } from "@/utils/sleep";

export function useNfcDetectCard({
  onSuccess,
}: {
  onSuccess: (id: string) => void;
}) {
  const nfcRef = useRef(new Nfc());
  const pollingRef = useRef(false);
  const [isPolling, setIsPolling] = useState(false);
  const detectCardIdPromiseRef = useRef<Promise<void> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const nextRef = useRef<"A" | "F">("F");

  const detectCardId = async () => {
    let previousDetectedId: string | null = null;
    if (pollingRef.current) {
      return;
    }

    setIsPolling(true);
    pollingRef.current = true;
    setError(null);

    const promise = (async () => {
      try {
        while (pollingRef.current) {
          const proto = nextRef.current;

          const id = await nfcRef.current.detectCardId(proto);

          // iPhoneのときに、交互に読み取る不具合があるため2回読み取りを行う
          // 2回のIDが一致した場合を成功とする
          if (id && previousDetectedId) {
            if (previousDetectedId === id) {
              onSuccess(id);
              await sleep(500);
            } else {
              // iPhoneのときに発生するため、Type-Fにする
              nextRef.current = "F";
              previousDetectedId = null;
              await sleep(100);
            }
            continue;
          }

          if (id && !previousDetectedId) {
            previousDetectedId = id;
            await sleep(100);
            continue;
          }

          if (!id && !previousDetectedId) {
            previousDetectedId = null;
            nextRef.current = proto === "A" ? "F" : "A";
            await sleep(100);
            continue;
          }

          if (!id) {
            previousDetectedId = null;
            await sleep(100);
            continue;
          }
        }
      } catch (e) {
        console.error("カード検出中にエラー:", e);
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        pollingRef.current = false;
        setIsPolling(false);
      }
    })();

    detectCardIdPromiseRef.current = promise;
    await promise;
  };

  const connectUsbDevice = async () => {
    try {
      setError(null);
      await nfcRef.current.connectUsbDevice();
      setIsPolling(true);
      detectCardId();
    } catch (e) {
      console.error("NFCリーダーの接続に失敗:", e);
      setError(e instanceof Error ? e.message : String(e));
      setIsPolling(false);
    }
  };

  const disconnectUsbDevice = async () => {
    try {
      pollingRef.current = false;
      setIsPolling(false);

      if (detectCardIdPromiseRef.current) {
        await detectCardIdPromiseRef.current;
      }

      await nfcRef.current.disconnectUsbDevice();
    } catch (e) {
      console.error("NFCリーダーの切断に失敗:", e);
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  useEffect(() => {
    return () => {
      disconnectUsbDevice();
    };
  }, []);

  return {
    connectUsbDevice,
    disconnectUsbDevice,
    isPolling,
    error,
  };
}
