import { Footer, LocaleProvider, type FooterGroup } from "@ucm/ui";

const groups: FooterGroup[] = [
  {
    title: { de: "Produkt", en: "Product" },
    links: [
      { label: { de: "Komponenten", en: "Components" }, href: "#" },
      { label: { de: "Grundlagen", en: "Foundations" }, href: "#" },
    ],
  },
  {
    title: { de: "Unternehmen", en: "Company" },
    links: [
      { label: { de: "Über uns", en: "About" }, href: "#" },
      { label: { de: "Kontakt", en: "Contact" }, href: "#" },
    ],
  },
  {
    title: { de: "Rechtliches", en: "Legal" },
    links: [
      { label: { de: "Impressum", en: "Imprint" }, href: "#" },
      { label: { de: "Datenschutz", en: "Privacy" }, href: "#" },
    ],
  },
];

const tagline = {
  de: "Eine Designsprache, zwei Oberflächen.",
  en: "One design language, two surfaces.",
};
const legal = { de: "© 2026 UCM", en: "© 2026 UCM" };

export function BrandFooterDemo() {
  return (
    <LocaleProvider>
      <div className="w-full overflow-hidden rounded-[16px] border border-[#001E2B]/10">
        <Footer mode="brand" tagline={tagline} groups={groups} legal={legal} />
      </div>
    </LocaleProvider>
  );
}

export function ProductFooterDemo() {
  return (
    <LocaleProvider>
      <div className="w-full overflow-hidden rounded-[16px] border border-[#001E2B]/10">
        <Footer mode="product" tagline={tagline} groups={groups} legal={legal} />
      </div>
    </LocaleProvider>
  );
}
