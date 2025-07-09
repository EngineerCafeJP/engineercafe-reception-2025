import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "@/components/LocaleSwitcherSelect";
import { routing } from "~/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} locales={routing.locales} />
  );
}
