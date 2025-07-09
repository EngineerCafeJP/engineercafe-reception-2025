"use client";

import { useParams } from "next/navigation";
import { Locale, useTranslations } from "next-intl";
import { ChangeEvent, useTransition } from "react";
import { usePathname, useRouter } from "~/i18n/navigation";

type LocaleSwitcherSelectProps = {
  locales: Readonly<Locale[]>;
  defaultValue: Locale;
};

export default function LocaleSwitcherSelect({
  locales,
  defaultValue,
}: LocaleSwitcherSelectProps) {
  const t = useTranslations("LocaleSwitcher");
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
      className="select select-xs border-base-300"
      defaultValue={defaultValue}
      disabled={isPending}
      id="locale-switcher"
      onChange={handleSelectChange}
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {t("locale", { locale })}
        </option>
      ))}
    </select>
  );
}
