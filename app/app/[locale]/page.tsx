import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { use } from "react";
import { redirect } from "~/i18n/navigation";
import { routing } from "~/i18n/routing";

export default function IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  redirect({ href: "/home", locale });
}
