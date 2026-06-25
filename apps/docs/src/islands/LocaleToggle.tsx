import { useEffect } from "react";
import { LocaleProvider, useLocale } from "@ucm/ui";

function Toggle() {
  const { locale, setLocale } = useLocale();

  // Rule 1.5: keep the document language in sync as the user switches locale
  // (the provider reads the stored value on mount, so this also corrects the
  // initial paint once hydrated).
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="flex items-center gap-1 rounded-full bg-[#EDECEA] p-[3px] text-[12px] font-medium">
      {(["de", "en"] as const).map((value) => (
        <button
          key={value}
          onClick={() => setLocale(value)}
          aria-pressed={locale === value}
          className={
            "rounded-full px-3 py-1 uppercase transition " +
            (locale === value
              ? "bg-[#FCC224] text-[#001E2B]"
              : "text-[#001E2B]/45 hover:text-[#001E2B]")
          }
        >
          {value}
        </button>
      ))}
    </div>
  );
}

export function LocaleToggle() {
  return (
    <LocaleProvider>
      <Toggle />
    </LocaleProvider>
  );
}
