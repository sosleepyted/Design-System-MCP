import {
  LocaleProvider,
  useLocale,
  Nav,
  Container,
  Section,
  Card,
  Button,
  type NavLink,
} from "@ucm/ui";

// Starter screen. Replace this with a page from get_pattern, or compose from
// components via search_components / get_component. Keep every string bilingual.
const links: NavLink[] = [
  { label: { de: "Übersicht", en: "Overview" }, href: "#" },
  { label: { de: "Team", en: "Team" }, href: "#" },
];

function Home() {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-[#F5F5F3]">
      <Nav
        mode="product"
        links={links}
        cta={{ label: { de: "Konto", en: "Account" }, href: "#" }}
      />
      <Container mode="product">
        <Section mode="product">
          <h1 className="text-[clamp(1.6rem,1rem+2vw,2.2rem)] font-light tracking-[-0.02em] text-[#001E2B]">
            {t({ de: "Willkommen", en: "Welcome" })}
          </h1>
          <p className="mt-2 max-w-[52ch] text-[15px] text-[#001E2B]/65">
            {t({
              de: "Diese App ist mit dem UCM Design System verbunden. Fragen Sie Claude Code, eine Seite zu bauen.",
              en: "This app is wired to the UCM design system. Ask Claude Code to build a page.",
            })}
          </p>
          <Card className="mt-6">
            <h2 className="text-[15px] font-semibold text-[#001E2B]">
              {t({ de: "Erste Schritte", en: "Get started" })}
            </h2>
            <p className="mt-1 text-[14px] leading-[1.6] text-[#001E2B]/70">
              {t({
                de: "Rufen Sie zuerst preflight auf, dann get_pattern für eine ganze Seite.",
                en: "Call preflight first, then get_pattern for a whole page.",
              })}
            </p>
            <div className="mt-4">
              <Button>{t({ de: "Loslegen", en: "Start" })}</Button>
            </div>
          </Card>
        </Section>
      </Container>
    </div>
  );
}

export function App() {
  return (
    <LocaleProvider>
      <Home />
    </LocaleProvider>
  );
}
