import {
  LocaleProvider,
  useLocale,
  Nav,
  Footer,
  Section,
  Container,
  Grid,
  Card,
  Icon,
  GlowButton,
  BrandButton,
  type Label,
  type IconName,
} from "@ucm/ui";

// Blessed brand landing page. Composed only from @ucm/ui. Edit the copy in
// `content`; leave the structure and components as they are. Every editable slot
// is a key of `content`: nav, hero, features, cta, footer.
const content = {
  nav: {
    links: [
      { label: { de: "Lösungen", en: "Solutions" }, href: "#solutions" },
      { label: { de: "Referenzen", en: "Customers" }, href: "#customers" },
      { label: { de: "Preise", en: "Pricing" }, href: "#pricing" },
    ],
    cta: { label: { de: "Personal anfragen", en: "Request staff" }, href: "#request" },
  },
  hero: {
    headline: {
      de: "Qualifiziertes Personal, genau wenn Sie es brauchen.",
      en: "Qualified staff, exactly when you need them.",
    } as Label,
    sub: {
      de: "UCM verbindet geprüfte Fachkräfte mit Einsätzen in Pflege, Gastronomie und Logistik, in wenigen Stunden statt Wochen.",
      en: "UCM matches vetted professionals to shifts in care, hospitality and logistics, in hours instead of weeks.",
    } as Label,
    primaryCta: { de: "Personal anfragen", en: "Request staff" } as Label,
    secondaryCta: { de: "So funktioniert es", en: "See how it works" } as Label,
  },
  features: {
    heading: { de: "Warum UCM", en: "Why UCM" } as Label,
    items: [
      {
        icon: "check_circle" as IconName,
        title: { de: "Geprüfte Fachkräfte", en: "Vetted professionals" } as Label,
        body: {
          de: "Jede Fachkraft ist qualifiziert, versichert und bewertet, bevor sie startet.",
          en: "Every professional is qualified, insured and rated before they start.",
        } as Label,
      },
      {
        icon: "info" as IconName,
        title: { de: "In Stunden besetzt", en: "Filled in hours" } as Label,
        body: {
          de: "Stellen Sie eine Anfrage und erhalten Sie passende Profile am selben Tag.",
          en: "Post a request and receive matching profiles the same day.",
        } as Label,
      },
      {
        icon: "lock" as IconName,
        title: { de: "Planbare Kosten", en: "Predictable cost" } as Label,
        body: {
          de: "Transparente Stundensätze, keine versteckten Gebühren, monatliche Abrechnung.",
          en: "Transparent hourly rates, no hidden fees, monthly billing.",
        } as Label,
      },
    ],
  },
  cta: {
    headline: {
      de: "Bereit, Ihre nächste Schicht zu besetzen?",
      en: "Ready to fill your next shift?",
    } as Label,
    button: { de: "Personal anfragen", en: "Request staff" } as Label,
  },
  footer: {
    tagline: {
      de: "Personalvermittlung, neu gedacht.",
      en: "Staffing, reimagined.",
    } as Label,
    groups: [
      {
        title: { de: "Produkt", en: "Product" } as Label,
        links: [
          { label: { de: "Lösungen", en: "Solutions" }, href: "#" },
          { label: { de: "Preise", en: "Pricing" }, href: "#" },
        ],
      },
      {
        title: { de: "Unternehmen", en: "Company" } as Label,
        links: [
          { label: { de: "Über uns", en: "About" }, href: "#" },
          { label: { de: "Kontakt", en: "Contact" }, href: "#" },
        ],
      },
      {
        title: { de: "Rechtliches", en: "Legal" } as Label,
        links: [
          { label: { de: "Impressum", en: "Imprint" }, href: "#" },
          { label: { de: "Datenschutz", en: "Privacy" }, href: "#" },
        ],
      },
    ],
    legal: { de: "© 2026 UCM", en: "© 2026 UCM" } as Label,
  },
};

function BrandLandingInner() {
  const { t } = useLocale();
  return (
    <div className="bg-[#F5F5F3]">
      <Nav mode="brand" links={content.nav.links} cta={content.nav.cta} />

      <main>
        <Section mode="brand">
          <Container mode="brand">
            <div className="max-w-[60ch]">
              <h1 className="text-[clamp(2.5rem,1rem+6vw,5rem)] font-light leading-[1.04] tracking-[-0.02em] text-[#001E2B]">
                {t(content.hero.headline)}
              </h1>
              <p className="mt-5 max-w-[52ch] text-[18px] leading-[1.5] text-[#001E2B]/65">
                {t(content.hero.sub)}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <GlowButton href="#request">{t(content.hero.primaryCta)}</GlowButton>
                <BrandButton variant="outline" href="#how">
                  {t(content.hero.secondaryCta)}
                </BrandButton>
              </div>
            </div>
          </Container>
        </Section>

        <Section mode="brand" id="solutions">
          <Container mode="brand">
            <h2 className="text-[clamp(1.8rem,1rem+3vw,2.8rem)] font-light tracking-[-0.02em] text-[#001E2B]">
              {t(content.features.heading)}
            </h2>
            <Grid cols={3} gap="lg" className="mt-10">
              {content.features.items.map((item) => (
                <Card key={item.icon}>
                  <Icon name={item.icon} size={24} className="text-[#001E2B]" />
                  <h3 className="mt-3 text-[16px] font-semibold text-[#001E2B]">
                    {t(item.title)}
                  </h3>
                  <p className="mt-1 text-[14px] leading-[1.6] text-[#001E2B]/70">
                    {t(item.body)}
                  </p>
                </Card>
              ))}
            </Grid>
          </Container>
        </Section>

        <Section mode="brand" id="request">
          <Container mode="brand">
            <div className="rounded-[28px] bg-[#001E2B] px-8 py-16 text-center">
              <h2 className="mx-auto max-w-[24ch] text-[clamp(1.8rem,1rem+3vw,2.6rem)] font-light leading-[1.1] text-[#F0F0EB]">
                {t(content.cta.headline)}
              </h2>
              <div className="mt-7 flex justify-center">
                <GlowButton href="#">{t(content.cta.button)}</GlowButton>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer
        mode="brand"
        tagline={content.footer.tagline}
        groups={content.footer.groups}
        legal={content.footer.legal}
      />
    </div>
  );
}

export function BrandLanding() {
  return (
    <LocaleProvider>
      <BrandLandingInner />
    </LocaleProvider>
  );
}
