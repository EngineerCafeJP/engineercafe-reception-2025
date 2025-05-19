"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LuIdCard } from "react-icons/lu";
import NfcRegistrationError from "@/app/(reception)/nfc-registration/components/NfcRegistrationError";
import NfcRegistrationForm from "@/app/(reception)/nfc-registration/components/NfcRegistrationForm";
import { useLatestRegisteredUser } from "@/app/(reception)/nfc-registration/hooks/use-latest-user";
import { useSubmitNfcRegistration } from "@/app/(reception)/nfc-registration/hooks/use-submit-nfc-registration";

export default function NfcRegistration() {
  const searchParams = useSearchParams();
  const searchParamUserId = searchParams.get("userId");
  const defaultUserId =
    searchParamUserId !== null && !Number.isNaN(Number(searchParamUserId))
      ? Number(searchParamUserId)
      : undefined;
  const {
    isLoading: isLatestRegisteredUserLoading,
    isError: isLatestRegisteredUserError,
    error: latestRegisteredUserError,
    data: latestRegisteredUser,
  } = useLatestRegisteredUser();
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

  if (isLatestRegisteredUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-xl" />
      </div>
    );
  }

  if (isLatestRegisteredUserError || isCreateNfcError) {
    return (
      <NfcRegistrationError
        error={createNfcError || latestRegisteredUserError}
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
            {latestRegisteredUser && (
              <NfcRegistrationForm
                defaultUserId={defaultUserId}
                isCreateNfcPending={isCreateNfcPending}
                isLatestRegisteredUserLoading={isLatestRegisteredUserLoading}
                latestRegisteredUser={{
                  id: latestRegisteredUser.id,
                  createdAt: latestRegisteredUser.createdAt,
                }}
                onSubmit={insertNfc}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
