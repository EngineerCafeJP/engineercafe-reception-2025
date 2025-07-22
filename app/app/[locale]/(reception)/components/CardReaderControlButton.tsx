import clsx from "clsx";
import { TbNfc, TbNfcOff } from "react-icons/tb";
import { useNfcDetectCard } from "@/hooks/use-nfc-detect-card";

type CardReaderControlButtonProps = {
  className?: string;
  onConnectUsbDevice?: () => void;
  onDisconnectUsbDevice?: () => void;
  onDetectCard: (cardId: string) => void;
};

export default function CardReaderControlButton({
  className,
  onConnectUsbDevice,
  onDisconnectUsbDevice,
  onDetectCard,
}: CardReaderControlButtonProps) {
  const { connectUsbDevice, disconnectUsbDevice, isPolling, error } =
    useNfcDetectCard({
      onSuccess: onDetectCard,
    });

  const handleConnect = () => {
    connectUsbDevice();
    onConnectUsbDevice?.();
  };

  const handleDisconnect = () => {
    disconnectUsbDevice();
    onDisconnectUsbDevice?.();
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-2 self-center sm:grid-cols-3",
        className,
      )}
    >
      <button
        className="btn btn-primary btn-sm col-span-full px-2 sm:col-span-2"
        disabled={isPolling}
        type="button"
        onClick={handleConnect}
      >
        {isPolling && (
          <>
            <span className="loading loading-ring loading-sm" />
            カードリーダーに接続中
          </>
        )}
        {!isPolling && (
          <>
            <TbNfc />
            カードリーダーに接続
          </>
        )}
      </button>
      {isPolling && (
        <button
          className="btn btn-sm col-span-full sm:col-span-1"
          type="button"
          onClick={handleDisconnect}
        >
          <TbNfcOff />
          切断
        </button>
      )}
      {error && (
        <span className="text-error col-span-full text-xs">{error}</span>
      )}
    </div>
  );
}
