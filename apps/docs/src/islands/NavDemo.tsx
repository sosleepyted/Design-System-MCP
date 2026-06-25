import { LocaleProvider, Nav, useLocale, type NavLink } from "@ucm/ui";

const links: NavLink[] = [
  { label: { de: "Grundlagen", en: "Foundations" }, href: "#" },
  { label: { de: "Komponenten", en: "Components" }, href: "#" },
  { label: { de: "Vorlagen", en: "Templates" }, href: "#" },
];

// A small inline locale toggle that shares the demo's LocaleProvider, so
// switching it updates the Nav labels live and shows the bilingual layer.
function InlineToggle() {
  const { locale, setLocale } = useLocale();
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

function Frame({ children, note }: { children: React.ReactNode; note: string }) {
  return (
    <div className="w-full overflow-hidden rounded-[16px] border border-[#001E2B]/10">
      {children}
      <div className="px-6 py-10 text-[13px] text-[#001E2B]/55">{note}</div>
    </div>
  );
}

export function BrandNavDemo() {
  return (
    <LocaleProvider>
      <Frame note="Brand chrome: yellow CTA, blurred cream surface.">
        <Nav
          mode="brand"
          links={links}
          cta={{ label: { de: "Personal anfragen", en: "Request staff" }, href: "#" }}
          actions={<InlineToggle />}
        />
      </Frame>
    </LocaleProvider>
  );
}

export function ProductNavDemo() {
  return (
    <LocaleProvider>
      <Frame note="Product chrome: navy CTA, restrained white surface.">
        <Nav
          mode="product"
          links={links}
          cta={{ label: { de: "Konto", en: "Account" }, href: "#" }}
          actions={<InlineToggle />}
        />
      </Frame>
    </LocaleProvider>
  );
}
