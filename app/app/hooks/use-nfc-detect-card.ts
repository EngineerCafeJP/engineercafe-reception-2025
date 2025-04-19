import { useEffect, useRef, useState } from "react";
import { Nfc } from "@/app/utils/nfc";
import { sleep } from "@/app/utils/sleep";

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

  const detectCardId = async () => {
    if (pollingRef.current) {
      return;
    }

    setIsPolling(true);
    pollingRef.current = true;
    setError(null);

    const promise = (async () => {
      try {
        while (pollingRef.current) {
          const id = await nfcRef.current.detectCardId();

          if (id) {
            onSuccess(id);
            await sleep(500);
          } else {
            await sleep(100);
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
