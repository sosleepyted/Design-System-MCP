import {
  LocaleProvider,
  useLocale,
  Nav,
  Footer,
  Section,
  Container,
  Grid,
  Stack,
  Card,
  Divider,
  Button,
  Field,
  Input,
  Select,
  Icon,
  type Label,
  type IconName,
} from "@ucm/ui";

// Blessed product dashboard shell. Restrained, navy, no glow. Two distinct
// panels (a request form and a recent-activity list), never a grid of identical
// metric cards. Edit the copy in `content`; leave the structure as it is.
// Editable slots: nav, header, requestPanel, activityPanel, footer.
const content = {
  nav: {
    links: [
      { label: { de: "Übersicht", en: "Overview" }, href: "#" },
      { label: { de: "Anfragen", en: "Requests" }, href: "#" },
      { label: { de: "Team", en: "Team" }, href: "#" },
    ],
    cta: { label: { de: "Konto", en: "Account" }, href: "#" },
  },
  header: {
    title: { de: "Übersicht", en: "Overview" } as Label,
    subtitle: {
      de: "Ihre offenen Anfragen und die letzten Aktivitäten.",
      en: "Your open requests and recent activity.",
    } as Label,
    action: { de: "Neue Anfrage", en: "New request" } as Label,
  },
  requestPanel: {
    title: { de: "Schnelle Anfrage", en: "Quick request" } as Label,
    nameLabel: { de: "Einsatzort", en: "Location" } as Label,
    namePlaceholder: { de: "z. B. München", en: "e.g. Munich" } as Label,
    roleLabel: { de: "Rolle", en: "Role" } as Label,
    rolePlaceholder: { de: "Bitte wählen", en: "Choose" } as Label,
    roleOptions: [
      { label: { de: "Pflegefachkraft", en: "Care professional" }, value: "care" },
      { label: { de: "Servicekraft", en: "Service staff" }, value: "service" },
      { label: { de: "Lagerhelfer", en: "Warehouse" }, value: "warehouse" },
    ],
    submit: { de: "Anfrage senden", en: "Send request" } as Label,
  },
  activityPanel: {
    title: { de: "Letzte Aktivität", en: "Recent activity" } as Label,
    items: [
      {
        icon: "check_circle" as IconName,
        text: { de: "Anfrage München bestätigt", en: "Munich request confirmed" } as Label,
        meta: { de: "vor 2 Stunden", en: "2 hours ago" } as Label,
      },
      {
        icon: "info" as IconName,
        text: { de: "Neues Profil vorgeschlagen", en: "New profile suggested" } as Label,
        meta: { de: "vor 5 Stunden", en: "5 hours ago" } as Label,
      },
      {
        icon: "edit" as IconName,
        text: { de: "Schicht Hamburg bearbeitet", en: "Hamburg shift edited" } as Label,
        meta: { de: "gestern", en: "yesterday" } as Label,
      },
    ],
  },
  footer: {
    legal: { de: "© 2026 UCM", en: "© 2026 UCM" } as Label,
    groups: [
      {
        title: { de: "Support", en: "Support" } as Label,
        links: [
          { label: { de: "Hilfe", en: "Help" }, href: "#" },
          { label: { de: "Status", en: "Status" }, href: "#" },
        ],
      },
    ],
  },
};

function ProductDashboardInner() {
  const { t } = useLocale();
  return (
    <div className="min-h-screen bg-[#F5F5F3]">
      <Nav mode="product" links={content.nav.links} cta={content.nav.cta} />

      <main>
        <Container mode="product">
          <Section mode="product" aria-label={t(content.header.title)}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-[clamp(1.6rem,1rem+2vw,2.2rem)] font-light tracking-[-0.02em] text-[#001E2B]">
                  {t(content.header.title)}
                </h1>
                <p className="mt-2 text-[15px] text-[#001E2B]/65">
                  {t(content.header.subtitle)}
                </p>
              </div>
              <Button>{t(content.header.action)}</Button>
            </div>
          </Section>

          <Grid cols={2} gap="lg" className="pb-12">
            <Card>
              <h2 className="text-[15px] font-semibold text-[#001E2B]">
                {t(content.requestPanel.title)}
              </h2>
              <form className="mt-4" onSubmit={(event) => event.preventDefault()}>
                <Stack gap="md">
                  <Field label={content.requestPanel.nameLabel} required>
                    <Input placeholder={t(content.requestPanel.namePlaceholder)} />
                  </Field>
                  <Field label={content.requestPanel.roleLabel} required>
                    <Select
                      placeholder={content.requestPanel.rolePlaceholder}
                      options={content.requestPanel.roleOptions}
                    />
                  </Field>
                  <Button>{t(content.requestPanel.submit)}</Button>
                </Stack>
              </form>
            </Card>

            <Card>
              <h2 className="text-[15px] font-semibold text-[#001E2B]">
                {t(content.activityPanel.title)}
              </h2>
              <ul className="mt-4">
                {content.activityPanel.items.map((item, index) => (
                  <li key={item.icon}>
                    {index > 0 ? <Divider className="my-3" /> : null}
                    <div className="flex items-start gap-3">
                      <Icon
                        name={item.icon}
                        size={18}
                        className="mt-0.5 text-[#001E2B]/45"
                      />
                      <div className="min-w-0">
                        <p className="text-[14px] text-[#001E2B]/85">{t(item.text)}</p>
                        <p className="text-[12px] text-[#001E2B]/55">{t(item.meta)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </Grid>
        </Container>
      </main>

      <Footer
        mode="product"
        groups={content.footer.groups}
        legal={content.footer.legal}
      />
    </div>
  );
}

export function ProductDashboard() {
  return (
    <LocaleProvider>
      <ProductDashboardInner />
    </LocaleProvider>
  );
}
