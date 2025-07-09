"use client";

import { useParams } from "next/navigation";
import { Locale } from "next-intl";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { usePathname, useRouter } from "~/i18n/navigation";

type LocaleSwitcherSelectProps = {
  children: ReactNode;
  defaultValue: Locale;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
}: LocaleSwitcherSelectProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;

    startTransition(() => {
      router.replace({ pathname, query: params }, { locale: nextLocale });
    });
  };

  return (
    <select
      className="select select-ghost select-xs"
      defaultValue={defaultValue}
      disabled={isPending}
      onChange={handleSelectChange}
    >
      {children}
    </select>
  );
}
