import { PostgrestError } from "@supabase/supabase-js";
import { MdErrorOutline } from "react-icons/md";

type NfcRegistrationErrorProps = {
  latestUserError: PostgrestError | null;
  createNfcError: PostgrestError | null;
};

export function NfcRegistrationError({
  latestUserError,
  createNfcError,
}: NfcRegistrationErrorProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="alert alert-vertical alert-error alert-soft sm:alert-horizontal mt-10"
        role="alert"
      >
        <MdErrorOutline size="1.5rem" />
        <div>
          <h3 className="font-bold">エラーが発生しました</h3>
          {latestUserError && (
            <div className="text-xs">{latestUserError.message}</div>
          )}
          {createNfcError && (
            <div className="text-xs">{createNfcError.message}</div>
          )}
          <div className="text-xs">画面を更新して下さい。</div>
        </div>
      </div>
    </div>
  );
}
