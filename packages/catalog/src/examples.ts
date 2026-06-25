// Short, runnable snippets per component. Copy is bilingual-friendly (German
// default, no em dashes) and uses only real props. Step 5 adds whole-page
// patterns; these stay atom-sized.
const EXAMPLES: Record<string, string> = {
  Button: `import { Button } from "@ucm/ui";

<Button onClick={() => save()}>Anfrage senden</Button>`,
  BrandButton: `import { BrandButton } from "@ucm/ui";

<BrandButton href="/anfragen">Personal anfragen</BrandButton>`,
  GlowButton: `import { GlowButton } from "@ucm/ui";

<GlowButton href="/bewerben">Jetzt bewerben</GlowButton>`,
  Icon: `import { Icon } from "@ucm/ui";

<span className="inline-flex items-center gap-2 text-[#001E2B]">
  <Icon name="check_circle" />
  Bestaetigt
</span>`,
  Nav: `import { LocaleProvider, Nav } from "@ucm/ui";

<LocaleProvider>
  <Nav
    mode="brand"
    links={[
      { label: { de: "Grundlagen", en: "Foundations" }, href: "/grundlagen" },
      { label: { de: "Komponenten", en: "Components" }, href: "/komponenten" },
    ]}
    cta={{ label: { de: "Personal anfragen", en: "Request staff" }, href: "/anfragen" }}
  />
</LocaleProvider>`,
  Footer: `import { Footer, LocaleProvider } from "@ucm/ui";

<LocaleProvider>
  <Footer
    mode="brand"
    tagline={{ de: "Eine Designsprache, zwei Oberflaechen.", en: "One design language, two surfaces." }}
    groups={[
      {
        title: { de: "Produkt", en: "Product" },
        links: [{ label: { de: "Komponenten", en: "Components" }, href: "/komponenten" }],
      },
    ]}
    legal={{ de: "© 2026 UCM", en: "© 2026 UCM" }}
  />
</LocaleProvider>`,
  Container: `import { Container } from "@ucm/ui";

<Container mode="product">
  <h1>Seiteninhalt</h1>
</Container>`,
  Section: `import { Container, Section } from "@ucm/ui";

<Section mode="brand" aria-label="Funktionen">
  <Container mode="brand">...</Container>
</Section>`,
  Stack: `import { Stack } from "@ucm/ui";

<Stack gap="md">
  <p>Erste Zeile</p>
  <p>Zweite Zeile</p>
</Stack>`,
  Grid: `import { Grid } from "@ucm/ui";

<Grid cols={3} gap="md">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Grid>`,
  Divider: `import { Divider } from "@ucm/ui";

<Divider />`,
  Card: `import { Card } from "@ucm/ui";

<Card>
  <h3 className="text-[15px] font-semibold text-[#001E2B]">Karte</h3>
  <p className="mt-1 text-[14px] text-[#001E2B]/70">Ein zurueckhaltender Produkt-Container.</p>
</Card>`,
  Field: `import { Field, Input, LocaleProvider } from "@ucm/ui";

<LocaleProvider>
  <Field
    label={{ de: "E-Mail", en: "Email" }}
    hint={{ de: "Wir melden uns hier.", en: "We will reach you here." }}
    required
  >
    <Input type="email" placeholder="you@ucm.jobs" />
  </Field>
</LocaleProvider>`,
  Input: `import { Input } from "@ucm/ui";

<Input placeholder="you@ucm.jobs" />`,
  Select: `import { LocaleProvider, Select } from "@ucm/ui";

<LocaleProvider>
  <Select
    placeholder={{ de: "Bitte waehlen", en: "Choose" }}
    options={[
      { label: { de: "Vollzeit", en: "Full time" }, value: "full" },
      { label: { de: "Teilzeit", en: "Part time" }, value: "part" },
    ]}
  />
</LocaleProvider>`,
  Checkbox: `import { Checkbox, LocaleProvider } from "@ucm/ui";

<LocaleProvider>
  <Checkbox label={{ de: "Ich stimme zu", en: "I agree" }} />
</LocaleProvider>`,
};

export function exampleFor(componentName: string): string {
  return (
    EXAMPLES[componentName] ??
    `import { ${componentName} } from "@ucm/ui";

<${componentName} />`
  );
}
