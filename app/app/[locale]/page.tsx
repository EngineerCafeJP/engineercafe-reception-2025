import { Locale } from "next-intl";
import { use } from "react";
import { redirect } from "~/i18n/navigation";

export default function IndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);

  redirect({ href: "/home", locale });
}
