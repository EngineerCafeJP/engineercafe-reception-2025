"use client";

import { useState } from "react";
import { LuIdCard } from "react-icons/lu";
import { MdInfoOutline } from "react-icons/md";
import { NfcRegistrationError } from "@/app/(reception)/nfc-registration/components/NfcRegistrationError";
import NfcRegistrationForm from "@/app/(reception)/nfc-registration/components/NfcRegistrationForm";
import { useLatestUser } from "@/app/(reception)/nfc-registration/hooks/use-latest-user";
import { useSubmitNfcRegistration } from "@/app/(reception)/nfc-registration/hooks/use-submit-nfc-registration";

export default function NfcRegistration() {
  const {
    isLoading: isLatestUserLoading,
    isError: isLatestUserError,
    error: latestUserError,
    data: latestUser,
  } = useLatestUser();
  const {
    isPending: isCreateNfcPending,
    isError: isCreateNfcError,
    error: createNfcError,
    insert: insertNfc,
  } = useSubmitNfcRegistration({
    onSuccess: () => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    },
  });
  const [showToast, setShowToast] = useState(false);

  if (isLatestUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-xl" />
      </div>
    );
  }

  if (isLatestUserError || isCreateNfcError) {
    return (
      <NfcRegistrationError
        createNfcError={createNfcError}
        latestUserError={latestUserError}
      />
    );
  }

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>登録が完了しました</span>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className="w-full max-w-3xl p-8">
          <div className="card card-border border-base-300 card-sm overflow-hidden">
            <div className="border-base-300 border-b">
              <div className="flex items-center gap-2 p-4">
                <div className="grow">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <LuIdCard />
                    カード (NFC) の登録
                  </div>
                </div>
              </div>
            </div>
            {latestUser?.[0] && (
              <NfcRegistrationForm
                isCreateNfcPending={isCreateNfcPending}
                isLatestUserLoading={isLatestUserLoading}
                latestUser={{
                  id: latestUser[0].id,
                  createdAt: latestUser[0].createdAt,
                }}
                onSubmit={insertNfc}
              />
            )}
            {!latestUser?.[0] && (
              <div className="card-body">
                <div className="alert alert-info alert-soft" role="alert">
                  <MdInfoOutline size="1.5rem" />
                  <span>登録されているユーザーがありません。</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
